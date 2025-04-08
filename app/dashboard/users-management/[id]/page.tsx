"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { updateUserData } from "@/app/api/user-management-api";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4, { message: "" }),
  reason: z.string(),
  currentStatus: z.boolean(),
});

const UserDetailPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const params = useParams();
  const userId = params.id as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUpdating(true);
    await updateUserData(
      userId,
      values.email,
      values.username,
      values.currentStatus,
      values.reason
    );

    setIsUpdating(false);
  }

  console.log(userId);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          form.reset({
            email: data.email || "",
            username: data.username || "",
            currentStatus: data.isActive,
          });
        }
        console.log(docSnap.data());
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      }
    };

    fetchAdminProfile();
  }, [userId, form]);

  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-900 text-gray-950 dark:text-white  rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage User</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Zone Name */}
          <Image src="/profile.png" alt="B" width={180} height={180} />
          <FormField
            control={form.control}
            name="currentStatus"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Is Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} className="md:w-1/2" />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    className="md:w-1/2"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Reason */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter reason"
                    {...field}
                    className="md:w-1/2"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              onClick={() => form.reset()}
              variant="outline"
              type="button"
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              disabled={isUpdating}
              type="submit"
              className={`${
                isUpdating ? "bg-[#e78064]" : "bg-[#E66641]"
              } text-white cursor-pointer`}
            >
              {isUpdating ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserDetailPage;
