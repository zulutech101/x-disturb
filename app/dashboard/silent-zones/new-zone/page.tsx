"use client";
import CreateSilentZone from "@/components/dashboard/silent-zones/new-silent-zone";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <Button className="px-0" variant="link" onClick={() => router.back()}>
        <p className="text-sm">Silent Zones/ Create Zone</p>
      </Button>
      <h1 className="text-2xl font-medium tracking-tight py-4">
        Create New Silent Zone
      </h1>
      <CreateSilentZone />
    </div>
  );
};

export default Page;
