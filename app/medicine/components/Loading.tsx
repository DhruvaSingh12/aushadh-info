import { Skeleton } from "@/components/ui/Skeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 h-[90vh] md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array(24)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="flex flex-row p-6 items-center gap-4">
            <div className="w-[30%]">
              <Skeleton className="h-[60px] w-[60px] rounded-full bg-accent" />
            </div>
            <div className="w-[70%] flex flex-col gap-y-2">
              <Skeleton className="h-[17px] w-[100px] mb-1 bg-accent" />
              <Skeleton className="h-[17px] w-[200px] bg-accent" />
              <Skeleton className="h-[17px] w-[120px] bg-accent" />
              <Skeleton className="h-[17px] w-[50px] bg-accent" />
            </div>
          </Skeleton>
        ))}
    </div>
  );
};

export default Loading;
