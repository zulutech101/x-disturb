"use client";
import UpdateSilentZone from "@/components/dashboard/silent-zones/edit-silent-zone";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <Button variant="link" onClick={() => router.back()}>
        <p className="text-sm">Silent Zones/ Edit Zone</p>
      </Button>
      <h1 className="text-2xl font-medium tracking-tight p-4">
        Edit Silent Zone
      </h1>
      <UpdateSilentZone />
    </div>
  );
};

export default Page;
