"use client"
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HereMap from "@/components/dashboard/silent-zones/HereMap";
import Image from "next/image";

const dummyData = [
  {
    user: "Ethan Clark",
    zone: "Downtown Business District",
    activity: "Entered Zone",
    timestamp: "10:15 AM",
  },
  {
    user: "Olivia Ramirez",
    zone: "Residential Area Alpha",
    activity: "Exited Zone",
    timestamp: "10:22 AM",
  },
  {
    user: "Nathan Walker",
    zone: "Commercial Zone B",
    activity: "Entered Zone",
    timestamp: "10:30 AM",
  },
  {
    user: "Ava Turner",
    zone: "Downtown Business District",
    activity: "Inside Zone",
    timestamp: "10:45 AM",
  },
  {
    user: "Liam Foster",
    zone: "Residential Area Alpha",
    activity: "Exited Zone",
    timestamp: "11:00 AM",
  },
];

interface Filters {
  insideZones: boolean;
  outsideZones: boolean;
}


const Page = () => {
  const [filters, setFilters] = useState<Filters>({
    insideZones: false,
    outsideZones: false,
  });

    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  
  const handleChange = (filter: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };
  const handleApplyFilters = () => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="w-full flex  gap-2">
      <div className="p-6 w-1/4 h-full flex flex-col gap-[15px]">
        <h1 className="text-xl font-bold  text-gray-900">Real-time activity</h1>
        <p className="text-gray-500 text-sm">
          Live update of user locations and activities with in designated zone.
        </p>

        <div className=" space-y-2">
          <p className="text-xl font-bold  text-gray-900">Zone selection</p>
          <Select defaultValue="Dembel City Center">
            <SelectTrigger className="w-full p-3 bg-white border border-gray-300 rounded-md cursor-pointer">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Dembel City Center">
                Dembel City Center
              </SelectItem>
              <SelectItem className="cursor-pointer" value="Edna Mall">Edna Mall</SelectItem>
              <SelectItem className="cursor-pointer" value="Century Mall">Century Mall</SelectItem>
              <SelectItem className="cursor-pointer" value="Friendship Park">Friendship Park</SelectItem>
              <SelectItem className="cursor-pointer" value="Unity Park">Unity Park</SelectItem>
              <SelectItem className="cursor-pointer" value="Entoto Park">Entoto Park</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" space-y-6">
      {/* Filters Section */}
      <div className="space-y-4">
      <h2 className="text-lg font-semibold">Activity Filters</h2>
      <div className="flex flex-col gap-2">
        {/* Fix 1: Use proper label association with the checkbox */}
        <div className=" flex items-center space-x-2">
          <Checkbox
            id="insideZones"
            checked={filters.insideZones}
            onCheckedChange={() => handleChange("insideZones")}
          />
          <Label htmlFor="insideZones" className="text-gray-950 cursor-pointer">
            Inside Zones
          </Label>
        </div>

        <div className="cursor-pointer flex items-center space-x-2">
          <Checkbox
            id="outsideZones"
            checked={filters.outsideZones}
            onCheckedChange={() => handleChange("outsideZones")}
          />
          <Label htmlFor="outsideZones" className="text-gray-950 cursor-pointer">
            Outside Zones
          </Label>
        </div>
      </div>
      <Button className="bg-gray-200 text-gray-950 w-full px-6 py-2 rounded-md" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>

      {/* User Activity Section */}
      <div>
        <h3 className="text-xl font-semibold">User Activity</h3>
        <div className="space-y-4 mt-4">
          {/* User Cards */}
          {[{ name: "Marcus Levin", zone: "Downtown Business District" },
            { name: "Jocelyn Dokidis", zone: "Downtown Business District" },
            { name: "Miracle Dias", zone: "Downtown Business District" }].map(
              (user, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{`User: ${user.name}`}</p>
                    <p className="text-sm text-gray-500">{`Entered Zone: ${user.zone}`}</p>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>

      </div>
      <div className="w-3/4 h-full flex flex-col gap-[10px]">
        <div className="   rounded-b-md">
        <HereMap  onCoordinatesChange={(coords) => {
              setCoordinates({
                lat: parseFloat(coords.lat), 
                lng: parseFloat(coords.lng), 
              });
            }}></HereMap>
        </div>
        <p className="text-gray-950 text-xl font-bold">Zone Log Activity</p>
        <div className="rounded-xl border overflow-hidden shadow-sm bg-background">
          <Table className="min-w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-950 dark:text-white shadow-md rounded-xl">
            <TableHeader className="border-b border-gray-400 dark:border-gray-600 ">
              <TableRow>
                <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                  User
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                  Zone
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                  Activity
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                  Time Stamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((user) => (
                //   onClick={()=>router.push(`users-management/${user.id}`)}
                <TableRow
                  key={user.user}
                  className="border-b border-gray-400 dark:border-gray-600 cursor-pointer"
                >
                  {/* <Link href={`dashboard/users-management/${user.id}`}> */}
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.user}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-500  dark:text-gray-200">
                    {user.zone}
                  </TableCell>
                  <TableCell className="flex items-center gap-4 px-6 py-4 text-sm ">
                    {user.activity}
                  </TableCell>

                  <TableCell>{user.timestamp}</TableCell>
                  {/* </Link> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
