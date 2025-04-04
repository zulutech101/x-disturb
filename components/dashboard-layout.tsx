"use client";
import { Header } from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./shared/sidebar";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { session } from "@/lib/sessionStorage";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // const userSession = sessionStorage.getItem("user");

  if (!user && !session.getItem("isAuthenticated")) {
    router.push("/");
  }

  console.log({ session });

  return (
    <div className="--header-height:calc(theme(spacing.14))">
      <SidebarProvider className="flex flex-col !max-h-[calc(100svh-var(--header-height))] overflow-y-scroll">
        <Header />
        <div className="flex flex-1  overflow-y-scroll">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
