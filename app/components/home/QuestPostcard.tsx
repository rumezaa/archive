"use client";

import { useEffect } from "react";
import type { Grantee } from "../../lib/data";

/** Shape of an entry in lib/storyPoints.js (untyped JS module). */
export type StoryPoint = {
  name: string;
  date: string;
  story: string;
  youtubeUrl: string;
  locationName?: string;
};

/** Pull the 11-ish-char video id out of any youtu.be / watch?v= / embed url. */
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?rel=0&autoplay=1` : null;
}

export default function QuestPostcard({
  grantee,
  story,
  onClose,
  onPrev,
  onNext,
}: {
  grantee: Grantee;
  story?: StoryPoint;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard nav + body scroll lock while the postcard is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const embed = story ? youtubeEmbed(story.youtubeUrl) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(58,10,19,.62)] p-4 backdrop-blur-[3px] animate-[popv_.25s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[560px] max-h-[90vh] w-full max-w-[940px] flex-col overflow-hidden rounded-[6px] border-[1.5px] border-ink bg-latte text-ink shadow-[10px_10px_0_var(--color-crimson)]"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-line-strong px-7 pb-5 pt-7">
          <div>
            <h3 className="font-disp text-[30px] font-extrabold lowercase leading-none text-crimson">
              {grantee.name}
            </h3>
            <div className="mt-[9px] font-mono text-[11px] uppercase tracking-[.12em] text-sienna">
              {story?.date ?? `season 0${grantee.season}`} · {grantee.loc}
            </div>
          </div>
          <div className="select-none pr-9 text-right leading-none">
            <div className="font-disp text-[20px] font-extrabold uppercase tracking-[.22em] text-ink opacity-[.7]">
              post card
            </div>
            <div className="mt-[5px] font-mono text-[10px] uppercase tracking-[.34em] opacity-50">
              the archive
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="close"
            className="absolute right-[18px] top-[18px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-paper text-[15px] text-crimson transition-colors hover:bg-crimson hover:text-latte"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="flex min-h-0 flex-1 gap-7 px-7 py-7 max-[760px]:flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto pr-3">
            <p className="text-[15px] leading-[1.62] opacity-[.88]">
              {story?.story ?? grantee.quest}
            </p>
          </div>

          <div className="w-[46%] flex-none max-[760px]:order-[-1] max-[760px]:w-full">
            {embed ? (
              <div className="aspect-video w-full overflow-hidden rounded-[5px] border-[1.5px] border-ink bg-ink shadow-[4px_4px_0_var(--color-ink)]">
                <iframe
                  key={embed}
                  src={embed}
                  title={`${grantee.name} — questline`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-[5px] border-[1.5px] border-dashed border-line-strong font-mono text-[12px] opacity-60">
                no footage yet
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-[6px]">
              {grantee.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line-strong px-[8px] py-[3px] font-mono text-[10px] tracking-[.04em] text-crimson"
                >
                  {t}
                </span>
              ))}
              <span className="rounded-full bg-pear px-[8px] py-[3px] font-mono text-[10px] tracking-[.04em] text-ink">
                ${grantee.amount} funded
              </span>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-dashed border-line-strong px-7 py-[14px] font-mono text-[11px] uppercase tracking-[.08em]">
          <button
            onClick={onPrev}
            className="cursor-pointer text-crimson opacity-80 transition-opacity hover:opacity-100"
          >
            ‹ prev
          </button>
          <span className="opacity-50 max-[520px]:hidden">
            ← → to navigate · esc to close
          </span>
          <button
            onClick={onNext}
            className="cursor-pointer text-crimson opacity-80 transition-opacity hover:opacity-100"
          >
            next ›
          </button>
        </div>
      </div>
    </div>
  );
}
