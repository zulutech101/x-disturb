"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
// import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { db } from "@/app/firebase/config";
import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { session } from "@/lib/sessionStorage";
import { useEffect, useState } from "react";
import HereMap from "./HereMap";
import { useSearchParams } from "next/navigation";

const CenterSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  adminID: z.string().min(1, {
    message: "Admin ID is required.",
  }),
  center: CenterSchema,
  description: z.string().optional(),
  isActive: z.boolean(),
  name: z.string().min(2, {
    message: "Zone name must be at least 2 characters.",
  }),
  radius: z.number().min(1).max(500),
  type: z.enum(["church", "mosque", "library"]),
});

export default function UpdateSilentZone() {
  const [isEditing, setIsEditing] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [zoneData, loading, error] = useDocumentData(
    id ? doc(db, "silent_zones", id) : null
  );

  console.log({ zoneData, loading, error });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      adminID: session?.getItem("userId") || "admin_user",
      center: {
        latitude: "0",
        longitude: "0",
      },
      description: "",
      isActive: true,
      name: "",
      radius: 100,
      type: "church",
    },
  });

  useEffect(() => {
    if (zoneData && !loading) {
      form.reset({
        address: zoneData.address || "",
        adminID: zoneData.adminID || session?.getItem("userId") || "admin_user",
        center: {
          latitude: String(zoneData.center?.latitude || "0"),
          longitude: String(zoneData.center?.longitude || "0"),
        },
        description: zoneData.description || "",
        isActive: zoneData.isActive || false,
        name: zoneData.name || "",
        radius: zoneData.radius || 100,
        type: zoneData.type || "church",
      });
    }
  }, [zoneData, loading, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditing(true);
    try {
      if (id) {
        const docRef = doc(db, "silent_zones", id);
        await updateDoc(docRef, {
          ...values,
          updatedAt: serverTimestamp(),
        });
        console.log("Document updated with ID:", id);
      }
    } catch (error) {
      console.error("Error processing silent zone:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to update silent zone. Please try again.",
      });
    }
    setIsEditing(false);
  }

  return (
    <div className="w-full mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Zone Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter zone name"
                    {...field}
                    className="md:w-1/2"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter zone description"
                    {...field}
                    className="md:w-1/2"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter address"
                    {...field}
                    className="md:w-1/2"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Type</FormLabel>
                <FormControl className="md:w-1/2">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="md:w-1/2">
                      <SelectValue placeholder="Select Location Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="church">church</SelectItem>
                      <SelectItem value="mosque">Mosque</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* isActive */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Is Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value} // Bind the checked state to the form value
                    onCheckedChange={field.onChange} // Update the form value on change
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Map Component */}
          <Card className="w-full col-span-2 h-[300px] bg-gray-50 rounded-md overflow-hidden">
            <div className="relative w-full h-full">
              {/* <MapPlace /> */}
              <HereMap />
            </div>
          </Card>

          {/* Zone Radius */}
          <FormField
            control={form.control}
            name="radius"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-between space-x-2 items-center">
                    <FormLabel className="text-nowrap">
                      Zone Radius (Meters)
                    </FormLabel>
                    <Slider
                      min={1}
                      max={500}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="md:w-1/2"
                    />
                    <span className="text-sm">{field.value}</span>
                  </div>
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
              disabled={isEditing}
              type="submit"
              className={`${
                isEditing ? "bg-[#e78064]" : "bg-[#E66641]"
              } text-white cursor-pointer`}
            >
              {isEditing ? "Updating Zone" : "Update Zone"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
