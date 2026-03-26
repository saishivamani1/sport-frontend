function Shimmer({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shimmer className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-3.5 w-3/5" />
          <Shimmer className="h-3 w-2/5" />
        </div>
      </div>
      <Shimmer className="h-3 w-full mb-2" />
      <Shimmer className="h-3 w-5/6 mb-2" />
      <Shimmer className="h-3 w-3/4" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }) {
  return (
    <tr className="border-b border-[#222222]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Shimmer className="h-3.5 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Shimmer className="w-20 h-20 rounded-full shrink-0" />
        <div className="flex-1 space-y-3">
          <Shimmer className="h-5 w-1/2" />
          <Shimmer className="h-3.5 w-1/3" />
          <Shimmer className="h-3 w-1/4" />
        </div>
      </div>
      <div className="space-y-2.5">
        <Shimmer className="h-3.5 w-full" />
        <Shimmer className="h-3.5 w-5/6" />
        <Shimmer className="h-3.5 w-4/6" />
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 space-y-3">
      <Shimmer className="w-8 h-8 rounded-xl" />
      <Shimmer className="h-7 w-1/2" />
      <Shimmer className="h-3 w-2/3" />
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#222222] last:border-0">
      <Shimmer className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-3.5 w-3/5" />
        <Shimmer className="h-3 w-2/5" />
      </div>
      <Shimmer className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 space-y-3">
      <div className="flex items-center gap-3">
        <Shimmer className="w-9 h-9 rounded-full shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Shimmer className="h-3.5 w-1/3" />
          <Shimmer className="h-3 w-1/4" />
        </div>
      </div>
      <Shimmer className="h-3.5 w-full" />
      <Shimmer className="h-3.5 w-5/6" />
      <Shimmer className="h-3.5 w-4/6" />
    </div>
  );
}
