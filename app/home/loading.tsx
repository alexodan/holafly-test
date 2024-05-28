import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome ...</h1>
      <div className="grid md:grid-cols-2 lg:grid-flow-col auto-cols-max gap-4 mt-16">
        <Skeleton count={2} />
      </div>
    </main>
  );
}
