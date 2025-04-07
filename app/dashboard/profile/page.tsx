"use client";

import { useState } from "react";
import {

  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "Biruk",
    lastName: "Biruk",
    email: "biruk.negu@x-distr.com",
    bio: "Write a few things about yourself",
    username: "tadesse",
    timezone: "(GMT +01:00) Greenwich Mean Time: Edinburgh, Lisbon, London",
    language: "English",
    notifications: {
      productInfo: true,
      nonEssential: false,
    },
  });

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [field]: value,
      },
    });
  };

  return (
    <div className="flex ">
      {/* Profile content */}
      <main className=" max-w-4xl ">
        <h1 className="text-2xl font-bold mb-6">My profile</h1>

        <div className="space-y-8">
          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-medium mb-4">Basic Info</h2>
            <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">
              <div className="bg-[#e76f51] aspect-square max-w-[200px] rounded-md flex items-center justify-center text-white text-4xl">
                B
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First name</label>
                  <Input
                    value={user.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last name</label>
                  <Input
                    value={user.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={user.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    placeholder="Write a few things about yourself"
                    className="bg-gray-50 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sign in credentials */}
          <section>
            <h2 className="text-lg font-medium mb-4">Sign in credentials</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                  value={user.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="bg-gray-50 max-w-md"
                />
              </div>
              <div>
                <Button
                  variant="outline"
                  className="text-[#e76f51] border-[#e76f51] hover:bg-[#e76f51]/10"
                >
                  Change password
                </Button>
              </div>
            </div>
          </section>

          {/* Location and language */}
          <section>
            <h2 className="text-lg font-medium mb-4">Location and language</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <div className="relative max-w-md">
                  <Input
                    value={user.timezone}
                    onChange={(e) => handleChange("timezone", e.target.value)}
                    className="bg-gray-50 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={user.language}
                  onValueChange={(value) => handleChange("language", value)}
                >
                  <SelectTrigger className="bg-gray-50 max-w-md">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Email and notification settings */}
          <section>
            <h2 className="text-lg font-medium mb-4">
              Email and notification settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="product-info"
                  checked={user.notifications.productInfo}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("productInfo", checked as boolean)
                  }
                  className="mt-1 data-[state=checked]:bg-[#e76f51] data-[state=checked]:border-[#e76f51]"
                />
                <div className="space-y-1">
                  <label
                    htmlFor="product-info"
                    className="text-sm font-medium cursor-pointer"
                  >
                    I agree to receive product information, feedback requests
                    and announcements of new features and products from
                    Epignosis.
                  </label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="non-essential"
                  checked={user.notifications.nonEssential}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("nonEssential", checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="space-y-1">
                  <label
                    htmlFor="non-essential"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Exclude from all non-essential emails and notifications
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Action buttons */}
          <div className="flex space-x-4">
               
                <Button  onClick={() => router.push("/dashboard")}  className="bg-[#e76f51] hover:bg-[#e76f51]/90 text-white">
              Save changes
            </Button>
                
                <Button onClick={() => router.push("/dashboard")}  variant="outline" className="border-[#E66641]">Cancel</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
