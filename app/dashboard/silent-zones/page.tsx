import SilentZones from "@/components/dashboard/silent-zones/silent-zones-table";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Silent Zones</h1>
      <p className="text-gray-700 mb-6">
        Manage geographical areas with restricted activity. You can view in list
        or map form and add new zones as needed.
      </p>

      <Button className="mb-6 bg-[#E66641] hover:bg-[#d25e3a] text-white font-medium">
        Add New Zone
      </Button>

      <SilentZones />
    </div>
  );
};

export default page;
