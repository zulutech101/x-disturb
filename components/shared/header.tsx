"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation"; // add at the top
import { auth } from "@/app/firebase/config";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { session } from "@/lib/sessionStorage";
import { signOut } from "firebase/auth";
import { Skeleton } from "../ui/skeleton";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import NotificationPanel from "../dashboard/notification/notification-panel";
import { useAdminContext } from "../context-provider";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  /* eslint-disable */
  const [profileData, setProfileData] = useState<any>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { triggerRefetch } = useAdminContext();

  const handleLogout = () => {
    signOut(auth);
    session.clear();
  };

  const id = session?.getItem("userId") || "admin_id";

  const { user, loading } = useAuthChecker();
  const username = user?.email?.split("@")[0] ?? "";
  const capitalizedInitials = username
    ? username
        .split(".")
        .map((word) => word[0]?.toUpperCase() ?? "")
        .join("")
    : "U";

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const docRef = doc(db, "admin_profile", id);
        const docSnap = await getDoc(docRef); // Await the promise
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
          console.log("Fetched profile data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAdminProfile();
  }, [id, triggerRefetch]);

  console.log(profileData);

  return (
    <header className="border-b border-gray-200 flex justify-end">
      <div className="container px-4 py-4 flex justify-end items-center">
        <div className="flex items-center gap-4">
         <NotificationPanel/>

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
              {loading || fetchLoading ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="hidden md:block space-y-1">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-2 w-16 rounded" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-orange-500 text-white">
                      {profileData?.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="font-medium capitalize">
                      {profileData?.username}
                    </div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                </div>
              )}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 cursor-pointer ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border !border-gray-300"
            >
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
                className="flex items-center gap-2 cursor-pointer hover:bg-[#E66641]/60"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 9C4.13401 9 1 12.134 1 16H15C15 12.134 11.866 9 8 9Z"
                    fill="currentColor"
                  />
                </svg>
                My profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer hover:bg-[#E66641]/60"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6667 11.3333L14 8L10.6667 4.66667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 8H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
