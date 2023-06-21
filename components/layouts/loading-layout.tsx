import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export const LayoutLoading: React.FC<{
  heading: string;
  text: string;
  buttonLabel: string;
}> = ({ heading, text, buttonLabel }) => {
  return (
    <DashboardShell>
      <DashboardHeader heading={heading} text={text}>
        <Button>{buttonLabel}</Button>
      </DashboardHeader>

      <div className="divide-border-200 divide-y rounded-md border">
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
      </div>
    </DashboardShell>
  );
};

export default LayoutLoading;
