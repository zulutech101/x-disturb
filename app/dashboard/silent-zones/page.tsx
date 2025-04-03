import SilentZones from "@/components/dashboard/silent-zones/silent-zones-table";
import Link from "next/link";

const page = () => {
  return (
    <div className="mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Silent Zones</h1>
        <p className="text-muted-foreground">
          Manage geographical areas with restricted activity. You can view in
          list or map form and add new zones as needed.
        </p>
      </div>

      <div>
        <Link
          href="/dashboard/silent-zones/new-zone"
          className="mb-6 px-4 py-2 rounded-xl cursor-pointer bg-[#E66641] hover:bg-[#d25e3a] text-white"
        >
          Add New Zone
        </Link>
      </div>

      <SilentZones />
    </div>
  );
};

export default page;
