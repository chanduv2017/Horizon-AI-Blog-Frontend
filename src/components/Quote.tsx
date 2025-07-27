export const Qoute = () => {
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-screen flex justify-center flex-col p-8">
      <div className="flex justify-center">
        <div className="max-w-lg text-center">
          <div className="text-6xl text-slate-400 mb-4">&quot;</div>
          <blockquote className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-6">
            Wisdom is not a product of schooling but of the lifelong attempt to
            acquire it
          </blockquote>
          <div className="border-t border-slate-300 pt-6">
            <cite className="text-xl font-semibold text-slate-700 not-italic">
              Albert Einstein
            </cite>
            <p className="text-sm font-medium text-slate-500 mt-2">
              Theoretical Physicist & Nobel Prize Winner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
