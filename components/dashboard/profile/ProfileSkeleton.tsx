import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* First Name */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>

      {/* Sign in credentials */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />{" "}
      </div>

      {/* Location and language */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-44" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />{" "}
          {/* Timezone select */}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />{" "}
          {/* Language select */}
        </div>
      </div>

      {/* Email and notification settings */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-56" />
        <div className="flex items-start space-x-2">
          <Skeleton className="h-5 w-5 mt-0.5" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex items-start space-x-2">
          <Skeleton className="h-5 w-5 mt-0.5" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    </div>
  );
}
