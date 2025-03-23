import { Skeleton } from "@/components/ui/Skeleton";

const Loading = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <Skeleton className="flex flex-row items-center gap-x-2 p-2 h-[50px]">
                {Array(13)
                    .fill(null)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[120px] h-[25px] bg-accent"
                        />
                    ))}
            </Skeleton>
            <div className="md:hidden flex justify-center items-center space-x-2 mt-4">
                {Array(5)
                    .fill(null)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[40px] h-[40px] rounded-full bg-accent"
                        />
                    ))}
            </div>

            <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-2 h-[100vh] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
                {Array(24)
                    .fill(null)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="flex flex-col p-5 gap-4 bg-muted"
                        >
                            <div className="flex flex-row gap-x-4 w-full">
                                <div className="w-[30%]">
                                    <Skeleton className="h-[55px] w-[55px] rounded-full bg-accent" />
                                </div>
                                <div className="w-[70%] flex flex-col gap-y-2">
                                    <Skeleton className="h-[20px] bg-accent" />
                                    <Skeleton className="h-[20px] bg-accent" />
                                </div>
                            </div>
                            <div className="w-full justify-between flex flex-row">
                                <Skeleton className="h-[17px] w-[200px] bg-accent" />
                                <Skeleton className="h-[17px] w-[40px] bg-accent" />
                            </div>
                            <div className="w-full flex justify-between items-center mt-2">
                                <Skeleton className="h-[17px] w-[40px] bg-accent" />
                                <Skeleton className="h-[17px] w-[200px] bg-accent" />
                            </div>
                        </Skeleton>
                    ))}
            </div>
        </div>
    );
};

export default Loading;
