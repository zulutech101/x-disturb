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
import { Search } from "lucide-react";

// Define the form schema with Zod
const formSchema = z.object({
  zoneName: z.string().min(2, {
    message: "Zone name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  zoneRadius: z.number().min(1).max(500),
});

export default function CreateSilentZone() {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zoneName: "",
      description: "",
      location: "",
      zoneRadius: 100,
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
  }

  return (
    <div className="w-full mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="zoneName"
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

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search for a location"
                    {...field}
                    className="md:w-1/2"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />

          {/* Map Component */}
          <Card className="w-full col-span-2 h-[300px]  bg-gray-50 rounded-md overflow-hidden">
            <div className="relative w-full h-full">
              <MapPlace />
            </div>
          </Card>

          <FormField
            control={form.control}
            name="zoneRadius"
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
              type="submit"
              className="bg-orange-500 text-white cursor-pointer"
            >
              Create Zone
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function MapPlace() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 relative">
      <div className="absolute inset-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1320.8605837054918!2d39.29040972240802!3d8.577775830638044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f3df1d9c86d%3A0x2b52666a2d1752b1!2sHayica%20pharma%20pharmaceuticals%20wholesaler!5e0!3m2!1sen!2set!4v1743687410513!5m2!1sen!2set"
          width="100%"
          height="400"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="absolute top-3 left-10 right-10 bg-white rounded-2xl p-1 shadow-smw-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="text-gray-500 text-sm" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full px-4 py-3 shadow-md ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none"
            placeholder="Search  for user or zone"
            required
          />
        </div>
      </div>
    </div>
  );
}
