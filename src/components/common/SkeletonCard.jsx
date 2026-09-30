export default function SkeletonCard() {
  return (
    <div className="border rounded p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}