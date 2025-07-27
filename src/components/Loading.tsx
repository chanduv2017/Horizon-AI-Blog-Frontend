export const Loading = () => {
  return (
    <div role="status" className="animate-pulse space-y-4">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
        <div className="h-4 bg-slate-200 rounded w-3/6"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
