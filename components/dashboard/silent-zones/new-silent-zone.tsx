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
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { session } from "@/lib/sessionStorage";
import { useState } from "react";
import HereMap from "./HereMap";

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

export default function CreateSilentZone() {
  const [isAdding, setIsAdding] = useState(false);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAdding(true);
    try {
      const docRef = await addDoc(collection(db, "silent_zones"), {
        ...values,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("Document written with ID:", docRef.id);
      form.reset();
    } catch (error) {
      console.error("Error adding document to silent_zones:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to create silent zone. Please try again.",
      });
    }
    setIsAdding(false);
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
              disabled={isAdding}
              type="submit"
              className={`${
                isAdding ? "bg-[#e78064]" : "bg-[#E66641]"
              } text-white cursor-pointer`}
            >
              Create Zone
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// function MapPlace() {
//   return (
//     <div className="w-full h-full flex items-center justify-center bg-gray-200 relative">
//       <div className="absolute inset-0">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1320.8605837054918!2d39.29040972240802!3d8.577775830638044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f3df1d9c86d%3A0x2b52666a2d1752b1!2sHayica%20pharma%20pharmaceuticals%20wholesaler!5e0!3m2!1sen!2set!4v1743687410513!5m2!1sen!2set"
//           width="100%"
//           height="400"
//           allowFullScreen={true}
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>

//         <div className="absolute top-3 left-10 right-10 bg-white rounded-2xl p-1 shadow-sm w-full">
//           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <Search className="text-gray-500 text-sm" />
//           </div>
//           <input
//             type="search"
//             id="default-search"
//             className="block w-full px-4 py-3 shadow-md ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none"
//             placeholder="Search for user or zone"
//             // required
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
