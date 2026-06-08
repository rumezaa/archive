export interface Grantee {
  name: string
  quest: string
  short: string
  loc: string
  x: number
  y: number
  /** Real [longitude, latitude] for the react-simple-maps atlas. */
  coords: [number, number]
  season: number
  amount: number
  tags: string[]
  /** Optional real headshot. Put files in /public (e.g. /faces/claire.jpg).
   *  When set, the photo is run through the same riso/duotone effect pipeline.
   *  When absent, a stylized portrait is generated from the name. */
  image?: string
}

export const G: Grantee[] = [
  {name:"claire",quest:"learned dutch from zero to conversational in 3 days, on film",short:"learned dutch in 3 days",loc:"amsterdam, NL",x:51.3,y:20.9,coords:[4.9041,52.3676],season:1,amount:400,tags:["language","film"],image:"/faces/claire.png"},
  {name:"sam",quest:"threw a matcha popup at founders inc",short:"matcha popup in SF",loc:"san francisco, US",x:16.0,y:29.0,coords:[-122.4194,37.7749],season:1,amount:600,tags:["community","food"],image:"/faces/sam.png"},
  {name:"pedro",quest:"crossed the world to reunite with someone",short:"crossed the world for love",loc:"seoul, KR",x:85.3,y:29.1,coords:[126.9780,37.5665],season:1,amount:500,tags:["love","travel"],image:"/faces/pedro.png"},
  {name:"aaron",quest:"wandered europe with his best friend, for the last time",short:"europe, one last time",loc:"barcelona, ES",x:50.6,y:27.0,coords:[2.1734,41.3851],season:1,amount:350,tags:["travel","friendship"],image:"/faces/aaron.png"},
  {name:"varun",quest:"an exhausted engineer sparking his art across 3 towns in wales",short:"art across wales",loc:"wales, UK",x:49.1,y:21.4,coords:[-3.1791,51.4816],season:1,amount:700,tags:["art","travel"],image:"/faces/varun.png"},
  {name:"emily",quest:"ran the largest turf-wars game in the heart of downtown toronto",short:"downtown turf wars",loc:"toronto, CA",x:28.0,y:25.8,coords:[-79.3832,43.6532],season:1,amount:300,tags:["community","games"],image:"/faces/emily.png"},
  {name:"kevin",quest:"visited sf on a whim, letting a voice agent guide his entire adventure",short:"an AI-guided day in sf",loc:"san francisco, US",x:16.8,y:30.2,coords:[-121.8863,37.3382],season:1,amount:800,tags:["travel","tech"],image:"/faces/kevin.png"},
]

export const tagColors: Record<string, string> = {
  language:"#BAD2E8", film:"#F9B6B8", community:"#C6B63B", food:"#F37521",
  love:"#F9B6B8", travel:"#BAD2E8", art:"#C6B63B", build:"#F37521",
  family:"#F9B6B8", archive:"#BAD2E8", music:"#C6B63B", craft:"#F37521",
  friendship:"#F9B6B8", games:"#C6B63B", tech:"#BAD2E8",
}

export const allTags = [...new Set(G.flatMap(g => g.tags))].sort()
