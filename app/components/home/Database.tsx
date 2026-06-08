"use client";

import { useMemo, useState } from "react";
import Wrap from "../ui/Wrap";
import SectionHead from "../ui/SectionHead";
import Avatar from "../ui/Avatar";
import TagPill from "../ui/TagPill";
import Portrait from "../Portrait";
import { G, allTags, type Grantee } from "../../lib/data";

type SortKey = "name" | "quest" | "loc" | "season" | "amount";

const chipCls = (on: boolean) =>
  `cursor-pointer rounded-full border-[1.5px] px-[13px] py-2 font-mono text-[11.5px] lowercase tracking-[.03em] transition-all duration-150 ${
    on
      ? "border-crimson bg-crimson text-latte"
      : "border-line-strong bg-transparent text-ink hover:border-crimson"
  }`;

const sBadge = (season: number) =>
  `rounded-full px-[9px] py-[3px] font-mono text-[11px] text-ink ${
    season === 1 ? "bg-rose" : "bg-arctic"
  }`;

export default function Database() {
  const [search, setSearch] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [activeTagFilters, setActiveTagFilters] = useState<Set<string>>(
    new Set(),
  );
  const [sortKey, setSortKey] = useState<SortKey>("season");
  const [sortDir, setSortDir] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d * -1);
    else {
      setSortKey(key);
      setSortDir(1);
    }
  };

  const toggleTag = (tag: string) =>
    setActiveTagFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });

  const filteredGrantees = useMemo(() => {
    let rows = G.filter((g) => {
      if (seasonFilter !== "all" && String(g.season) !== seasonFilter)
        return false;
      if (
        activeTagFilters.size > 0 &&
        ![...activeTagFilters].every((t) => g.tags.includes(t))
      )
        return false;
      if (search) {
        const blob =
          `${g.name} ${g.quest} ${g.loc} ${g.tags.join(" ")}`.toLowerCase();
        if (!blob.includes(search.toLowerCase())) return false;
      }
      return true;
    });
    rows = [...rows].sort((a, b) => {
      const va = a[sortKey as keyof Grantee];
      const vb = b[sortKey as keyof Grantee];
      if (typeof va === "string" && typeof vb === "string")
        return va.localeCompare(vb) * sortDir;
      return ((va as number) - (vb as number)) * sortDir;
    });
    return rows;
  }, [search, seasonFilter, activeTagFilters, sortKey, sortDir]);

  return (
    <section id="database" className="py-[84px]">
      <Wrap>
        <div className="reveal">
          <SectionHead
            accent="crimson"
            tag="the database"
            title="get inspired"
            lead="computa - show me the quests!"
          />
        </div>

        {/* controls */}
        <div className="reveal mb-5 mt-[38px] flex flex-wrap items-center gap-3">
          <label className="flex min-w-[220px] flex-1 items-center gap-[10px] rounded-[2px] border-[1.5px] border-line-strong bg-white px-[14px] py-[11px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#8B162B"
              strokeWidth="1.6"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3 3" />
            </svg>
            <input
              type="text"
              placeholder="search a name, quest, or place..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-0 bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-[rgba(58,10,19,.4)]"
            />
          </label>

          <div className="flex flex-wrap gap-[7px]">
            {(["all", "1", "2"] as const).map((s) => (
              <button
                key={s}
                className={chipCls(seasonFilter === s)}
                onClick={() => setSeasonFilter(s)}
              >
                {s === "all" ? "all seasons" : `season 0${s}`}
              </button>
            ))}
          </div>

          <div className="flex overflow-hidden rounded-[2px] border-[1.5px] border-line-strong">
            {(["table", "cards"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`cursor-pointer border-0 px-[14px] py-[9px] font-mono text-[11.5px] lowercase ${
                  viewMode === m ? "bg-ink text-latte" : "bg-transparent text-ink"
                }`}
              >
                {m === "table" ? "▦ table" : "▢ cards"}
              </button>
            ))}
          </div>
        </div>

        {/* tag filters */}
        <div className="reveal mb-[22px] flex flex-wrap gap-[7px]">
          {allTags.map((t) => (
            <button
              key={t}
              className={chipCls(activeTagFilters.has(t))}
              onClick={() => toggleTag(t)}
            >
              #{t}
            </button>
          ))}
        </div>

        <div className="reveal">
          {filteredGrantees.length === 0 && (
            <div className="p-10 text-center font-mono text-[13px] opacity-60">
              no quests match that. try fewer filters ✦
            </div>
          )}

          {filteredGrantees.length > 0 && viewMode === "table" && (
            <table className="w-full border-collapse overflow-hidden rounded-[3px] border-[1.5px] border-line-strong bg-white text-[14px]">
              <thead>
                <tr>
                  {(["name", "quest", "loc", "season", "amount"] as SortKey[]).map(
                    (k) => (
                      <th
                        key={k}
                        onClick={() => handleSort(k)}
                        className="cursor-pointer select-none whitespace-nowrap border-b-[1.5px] border-line-strong px-4 py-[14px] text-left font-mono text-[11px] uppercase tracking-[.08em] text-crimson"
                      >
                        {k === "name"
                          ? "quester"
                          : k === "quest"
                            ? "the side quest"
                            : k === "loc"
                              ? "location"
                              : k}{" "}
                        {k !== "quest" && <span className="opacity-40">↕</span>}
                      </th>
                    ),
                  )}
                  <th className="border-b-[1.5px] border-line-strong px-4 py-[14px] text-left font-mono text-[11px] uppercase tracking-[.08em] text-crimson">
                    tags
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGrantees.map((g) => (
                  <tr
                    key={g.name}
                    className="transition-colors last:[&>td]:border-b-0 hover:bg-[rgba(249,182,184,.22)]"
                  >
                    <td className="border-b border-line px-4 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-[38px] w-[38px]">
                          <Portrait
                            name={g.name}
                            effect="duotone"
                            image={g.image}
                          />
                        </Avatar>
                        <span className="font-disp text-[16px] font-bold text-crimson">
                          {g.name}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-line px-4 py-3 align-middle opacity-[.85]">
                      {g.quest}
                    </td>
                    <td className="whitespace-nowrap border-b border-line px-4 py-3 align-middle font-mono text-[12px] opacity-70">
                      {g.loc}
                    </td>
                    <td className="border-b border-line px-4 py-3 align-middle">
                      <span className={sBadge(g.season)}>S0{g.season}</span>
                    </td>
                    <td className="border-b border-line px-4 py-3 align-middle font-mono font-bold text-ink">
                      ${g.amount}
                    </td>
                    <td className="border-b border-line px-4 py-3 align-middle">
                      {g.tags.map((t) => (
                        <TagPill key={t} tag={t} />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filteredGrantees.length > 0 && viewMode === "cards" && (
            <div className="grid grid-cols-3 gap-4 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
              {filteredGrantees.map((g) => (
                <div
                  key={g.name}
                  className="rounded-[3px] border-[1.5px] border-line-strong bg-white p-[18px] transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-[5px_5px_0_var(--color-line-strong)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-[11px]">
                      <Avatar className="h-[44px] w-[44px]">
                        <Portrait
                          name={g.name}
                          effect="duotone"
                          image={g.image}
                        />
                      </Avatar>
                      <div>
                        <span className="font-disp text-[18px] font-bold text-crimson">
                          {g.name}
                        </span>
                        <div className="mt-[3px] whitespace-nowrap font-mono text-[12px] opacity-70">
                          {g.loc}
                        </div>
                      </div>
                    </div>
                    <span className={sBadge(g.season)}>S0{g.season}</span>
                  </div>
                  <div className="mt-3 text-[14px] leading-[1.45]">{g.quest}</div>
                  <div className="mt-[14px] flex items-center justify-between">
                    <span className="font-mono font-bold text-ink">
                      ${g.amount}
                    </span>
                    <span>
                      {g.tags.map((t) => (
                        <TagPill key={t} tag={t} />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrap>
    </section>
  );
}
