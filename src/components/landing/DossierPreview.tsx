export default function DossierPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] select-none" aria-hidden>
      {/* Feuille de CV, légèrement inclinée */}
      <div className="relative rotate-[-2.5deg] rounded-[2px] bg-white shadow-[0_30px_60px_-25px_rgba(10,40,25,0.35)] ring-1 ring-black/5">
        {/* bandeau d'en-tête du CV */}
        <div className="flex items-center gap-3 border-b border-[#E4E0D3] px-5 pt-5 pb-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-[#0B6E4F]/15" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-28 rounded-sm bg-[#10241C]/80" />
            <div className="h-2 w-20 rounded-sm bg-[#10241C]/30" />
          </div>
        </div>

        {/* corps : deux colonnes façon template */}
        <div className="grid grid-cols-[34%_66%] gap-0">
          <div className="space-y-4 border-r border-[#E4E0D3] px-4 py-4">
            <div className="space-y-1.5">
              <div className="h-1.5 w-10 rounded-sm bg-[#FF7A1A]/70" />
              <div className="h-1.5 w-full rounded-sm bg-[#10241C]/15" />
              <div className="h-1.5 w-4/5 rounded-sm bg-[#10241C]/15" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-12 rounded-sm bg-[#FF7A1A]/70" />
              <div className="h-1.5 w-full rounded-sm bg-[#10241C]/15" />
              <div className="h-1.5 w-3/5 rounded-sm bg-[#10241C]/15" />
            </div>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="space-y-1.5">
              <div className="h-1.5 w-16 rounded-sm bg-[#0B6E4F]/70" />
              <div className="h-1.5 w-full rounded-sm bg-[#10241C]/15" />
              <div className="h-1.5 w-full rounded-sm bg-[#10241C]/15" />
              <div className="h-1.5 w-2/3 rounded-sm bg-[#10241C]/15" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-20 rounded-sm bg-[#0B6E4F]/70" />
              <div className="h-1.5 w-full rounded-sm bg-[#10241C]/15" />
              <div className="h-1.5 w-4/5 rounded-sm bg-[#10241C]/15" />
            </div>
          </div>
        </div>

        {/* annotation façon relecture, ancrée sur la colonne compétences */}
        <div className="absolute left-[26%] top-[38%] flex items-center gap-1.5">
          <svg width="34" height="14" viewBox="0 0 34 14" className="text-[#0B6E4F]">
            <path
              d="M1 1c8 8 16 10 32 11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="2.5 2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* cachet — score ATS, posé sur le coin du document */}
      <div className="absolute -bottom-5 -right-4 flex h-[76px] w-[76px] rotate-[8deg] flex-col items-center justify-center rounded-full border-[1.5px] border-dashed border-[#FF7A1A] bg-[#FAF9F5] text-center shadow-sm">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#FF7A1A]">
          Score ATS
        </span>
        <span className="font-serif text-xl font-bold leading-none text-[#0B6E4F]">92%</span>
      </div>

      {/* étiquette de relecture */}
      <div className="absolute -left-4 top-[34%] rounded-[2px] border border-[#0B6E4F]/25 bg-[#FAF9F5] px-2 py-1 text-[10px] font-medium text-[#0B6E4F] shadow-sm">
        Mots-clés détectés ✓
      </div>
    </div>
  );
}
