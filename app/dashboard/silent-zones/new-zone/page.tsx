import CreateSilentZone from "@/components/dashboard/silent-zones/new-silent-zone";

const page = () => {
  return (
    <div>
      <div className="space-y-3">
        <p className="text-sm">Silent Zones/ Create Zone</p>
        <h1 className="text-2xl font-medium tracking-tight">
          Create New Silent Zone
        </h1>
      </div>
      <CreateSilentZone />
    </div>
  );
};

export default page;
