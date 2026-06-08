"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  Sphere,
} from "react-simple-maps";
import Wrap from "../ui/Wrap";
import SectionHead from "../ui/SectionHead";
import PortraitFrame from "../ui/PortraitFrame";
import Portrait from "../Portrait";
import QuestPostcard, { type StoryPoint } from "./QuestPostcard";
import { G } from "../../lib/data";
import { storyPoints } from "../../lib/storyPoints";

/** World topojson served from a CDN; fetched client-side by <Geographies>. */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
/** Full story + youtube link, keyed by first name to match G. */
const STORY_BY_NAME: Record<string, StoryPoint> = Object.fromEntries(
  (storyPoints as StoryPoint[]).map((s) => [
    s.name.split(" ")[0].toLowerCase(),
    s,
  ]),
);

export default function Atlas() {
  const [activeQuestIdx, setActiveQuestIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  // react-simple-maps projects in floating point; tiny SSR/client rounding
  // differences cause hydration mismatches, so render the atlas client-only.
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => setMapReady(true), []);

  const activeGrant = G[activeQuestIdx];
  const coordText = `lat ${activeGrant.coords[1].toFixed(1)} · lon ${activeGrant.coords[0].toFixed(1)}`;

  return (
    <section id="atlas" className="pb-[84px] pt-[36px]">
      <Wrap>
        <div className="reveal">
          <SectionHead
            accent="arctic"
            tag="the atlas"
            title="help us fill our map :)"
            lead="a flat-world map of of archived adventures. tap a marker to follow the trail each of our grantees leaves behind."
          />
        </div>

        <div className="reveal mt-[42px] grid grid-cols-[1.55fr_.85fr] items-stretch gap-[26px] max-[900px]:grid-cols-1">
          {/* map */}
          <div className="relative min-h-[430px] overflow-hidden rounded-[3px] border-[1.5px] border-line-strong bg-[radial-gradient(circle_at_30%_20%,rgba(186,210,232,.3),transparent_60%),rgba(255,255,255,.46)]">
            <div className="flex items-center justify-between border-b-[1.5px] border-line px-[18px] py-[14px] font-mono text-[11.5px] uppercase tracking-[.06em]">
              <span>◎ the atlas</span>
              <span className="opacity-[.55]">{coordText}</span>
            </div>
            <div className="relative aspect-[2/1.04] w-full [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full">
              {mapReady && (
                <ComposableMap
                  projection="geoEquirectangular"
                  width={800}
                  height={416}
                  projectionConfig={{ scale: 133, rotate: [-10, 0, 0] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Sphere
                    id="rsm-sphere"
                    fill="rgba(186,210,232,.12)"
                    stroke="none"
                    strokeWidth={0}
                  />
                  <Graticule
                    stroke="rgba(139,22,43,.10)"
                    strokeWidth={0.5}
                    step={[20, 20]}
                  />

                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="rgba(139,22,43,.13)"
                          stroke="rgba(139,22,43,.28)"
                          strokeWidth={0.4}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              outline: "none",
                              fill: "rgba(139,22,43,.2)",
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {G.map((g, i) => ({ g, i }))
                    .sort(
                      (a, b) =>
                        (a.i === activeQuestIdx ? 1 : 0) -
                        (b.i === activeQuestIdx ? 1 : 0),
                    )
                    .map(({ g, i }) => {
                      const active = activeQuestIdx === i;
                      const color = g.season === 1 ? "#8B162B" : "#F37521";
                      const s = active ? 0.92 : 0.64;
                      return (
                        <Marker
                          key={g.name}
                          coordinates={g.coords}
                          onMouseEnter={() => setActiveQuestIdx(i)}
                          onClick={() => {
                            setActiveQuestIdx(i);
                            setOpenIdx(i);
                          }}
                          style={{ default: { cursor: "pointer" } }}
                        >
                          <g
                            transform={`translate(${-16 * s}, ${-27 * s}) scale(${s})`}
                            style={{
                              filter:
                                "drop-shadow(1px 2px 0 rgba(58,10,19,.35))",
                              transition: "all .18s",
                            }}
                          >
                            <path
                              d="M16 3 L28 27 L16.5 21.5 L4 27 Z"
                              fill={color}
                              stroke={color}
                              strokeWidth={1.4}
                              strokeLinejoin="round"
                            />
                            <circle cx={15.2} cy={12.2} r={1.7} fill="#F6F3CF" />
                          </g>
                          {active && (
                            <g transform="translate(0,-30)">
                              <rect
                                x={-(g.name.length * 3.4 + 7)}
                                y={-9}
                                width={g.name.length * 6.8 + 14}
                                height={16}
                                rx={2}
                                fill="#3a0a13"
                              />
                              <text
                                textAnchor="middle"
                                y={2}
                                fontFamily="var(--font-mono)"
                                fontSize={9}
                                letterSpacing={0.4}
                                fill="#F6F3CF"
                              >
                                {g.name}
                              </text>
                            </g>
                          )}
                        </Marker>
                      );
                    })}
                </ComposableMap>
              )}
            </div>
          </div>

          {/* active quest panel */}
          <button
            type="button"
            onClick={() => setOpenIdx(activeQuestIdx)}
            className="group flex cursor-pointer flex-col rounded-[3px] border-[1.5px] border-line-strong bg-crimson p-6 text-left text-latte transition-shadow duration-200 hover:shadow-[6px_6px_0_var(--color-ink)]"
          >
            <div className="flex items-center gap-4">
              <PortraitFrame className="h-[84px] w-[74px] flex-none border-2 border-[rgba(246,243,207,.6)]">
                <Portrait
                  name={activeGrant.name}
                  effect="duotone"
                  image={activeGrant.image}
                />
              </PortraitFrame>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[.12em] text-pear">
                  season 0{activeGrant.season} · funded
                </span>
                <div className="mt-[7px] font-disp text-[28px] font-extrabold lowercase leading-none">
                  {activeGrant.name}
                </div>
                <div className="mt-[7px] flex items-center gap-2 font-mono text-[12px] opacity-80">
                  ◷ {activeGrant.loc}
                </div>
              </div>
            </div>
            <div className="mt-[18px] text-[17px] font-medium leading-[1.42]">
              {activeGrant.quest}
            </div>
            <span className="mt-[14px] flex items-center gap-1 font-mono text-[11px] uppercase tracking-[.1em] text-pear opacity-90 transition-transform duration-200 group-hover:translate-x-1">
              read the postcard ➔
            </span>
            <div className="mt-auto flex items-end justify-between border-t border-[rgba(246,243,207,.25)] pt-[22px]">
              <div className="font-disp text-[32px] font-extrabold">
                ${activeGrant.amount}
              </div>
              <div className="flex max-w-[55%] flex-wrap justify-end gap-[6px]">
                {activeGrant.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[rgba(246,243,207,.4)] px-[7px] py-[3px] font-mono text-[10px] tracking-[.04em]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        </div>
      </Wrap>

      {openIdx !== null && (
        <QuestPostcard
          grantee={G[openIdx]}
          story={STORY_BY_NAME[G[openIdx].name]}
          onClose={() => setOpenIdx(null)}
          onPrev={() => {
            const n = (openIdx - 1 + G.length) % G.length;
            setOpenIdx(n);
            setActiveQuestIdx(n);
          }}
          onNext={() => {
            const n = (openIdx + 1) % G.length;
            setOpenIdx(n);
            setActiveQuestIdx(n);
          }}
        />
      )}
    </section>
  );
}
