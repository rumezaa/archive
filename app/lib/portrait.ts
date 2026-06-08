type RGB = [number, number, number]

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

const CREAM: RGB = [246, 243, 207]
const CRIMSON_RGB: RGB = [139, 22, 43]
const SIENNA_RGB: RGB = [243, 117, 33]
const PASTEL: RGB[] = [
  [249, 182, 184], [186, 210, 232], [230, 219, 164],
  [244, 223, 196], [215, 226, 204], [241, 201, 176],
]
/** Dark "ink" tone, varied per portrait so faces aren't all crimson. Five
 *  visually distinct brand-derived hues: 0 crimson(red), 1 burnt sienna(orange),
 *  2 olive(pear), 3 arctic(blue), 4 dusty rose(pink). */
const INKS: RGB[] = [
  [139, 22, 43], [176, 68, 18], [104, 92, 30],
  [42, 86, 114], [168, 92, 108],
]
/** Curated ink per grantee — cycles through all 5 hues, with the two repeats
 *  placed so no neighbour shares a colour (order: claire, sam, pedro, aaron,
 *  varun, emily, kevin). Unknown names fall back to a hash. */
const INK_BY_NAME: Record<string, number> = {
  claire: 0, sam: 1, pedro: 2, aaron: 3, varun: 4, emily: 1, kevin: 3,
}
const inkFor = (name: string): RGB =>
  INKS[INK_BY_NAME[name.toLowerCase()] ?? hash('ink' + name) % INKS.length]

const mix = (a: RGB, b: RGB, t: number): RGB =>
  [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

function lumField(name: string, W: number, H: number): Float32Array {
  const seed = hash(name), hairStyle = seed % 6, skin = 0.04 + (seed % 6) * 0.05
  const cx = 50, cyH = 44, rxH = 20, ryH = 25, hairShift = hairStyle === 2 ? 6 : 0
  const hpX = [5, 6, 5, 3, 6, 5][hairStyle]
  const hpY = [7, 11, 8, 3, 9, 7][hairStyle]
  const hairlineY = cyH - ryH * [0.55, 0.7, 0.55, 0.3, 0.6, 0.55][hairStyle]
  const longHair = hairStyle === 4
  const D = new Float32Array(W * H)
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const x = px / W * 100, y = py / H * 116
      let s = 0.05
      const sh = ((x - 50) / 46) ** 2 + ((y - 128) / 42) ** 2
      if (y > 78 && sh <= 1) { s = 0.5; if (Math.abs(x - 50) < 11 && y < 94) s = 0.2 }
      if (x > cx - 7 && x < cx + 7 && y > cyH + ryH - 6 && y < 82) s = 0.34 + skin
      const nx = (x - cx) / rxH, ny = (y - cyH) / ryH, r = Math.hypot(nx, ny)
      const face = r <= 1 && y > hairlineY
      if (face) {
        const lit = clamp(0.5 - 0.42 * (nx * 0.7 + ny * 0.45))
        s = 0.12 + skin + lit * 0.34
        if (r > 0.74) s += (r - 0.74) * 1.5
        const ey = cyH + 1
        if (Math.hypot(x - (cx - 7.5), y - ey) < 2.6) s = 0.9
        if (Math.hypot(x - (cx + 7.5), y - ey) < 2.6) s = 0.9
        if (y > cyH + 9 && y < cyH + 13 && Math.abs(x - cx) < 5) s = Math.max(s, 0.55)
        if (Math.abs(x - cx) < 1.6 && y > cyH + 2 && y < cyH + 8) s = Math.max(s, 0.42)
      }
      const inHair = ((x - cx - hairShift) / (rxH + hpX)) ** 2 + ((y - cyH) / (ryH + hpY)) ** 2 <= 1
      const hairBottom = longHair ? 86 : cyH + 3
      if (inHair && !face && y < hairBottom && y > cyH - ryH - hpY - 2) s = 0.82
      if (hairStyle === 5 && Math.hypot(x - cx, y - (cyH - ryH - 4)) < 6) s = 0.9
      D[py * W + px] = clamp(s)
    }
  }
  return D
}

type PixFn = (x: number, y: number, i: number) => RGB

function pixmap(ctx: CanvasRenderingContext2D, W: number, H: number, fn: PixFn) {
  const im = ctx.createImageData(W, H)
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const i = py * W + px, c = fn(px, py, i)
      im.data[i * 4] = c[0]; im.data[i * 4 + 1] = c[1]
      im.data[i * 4 + 2] = c[2]; im.data[i * 4 + 3] = 255
    }
  }
  ctx.putImageData(im, 0, 0)
}

type FXFn = (ctx: CanvasRenderingContext2D, W: number, H: number, D: Float32Array, light: RGB, ink: RGB) => void

const FX: Record<string, FXFn> = {
  duotone: (ctx, W, H, D, light, ink) => pixmap(ctx, W, H, (x, y, i) => mix(light, ink, D[i])),
  posterize: (ctx, W, H, D, light, ink) => pixmap(ctx, W, H, (x, y, i) => {
    const n = 5, q = Math.round(D[i] * (n - 1)) / (n - 1)
    return mix(light, ink, q)
  }),
  hatch: (ctx, W, H, D, light, ink) => pixmap(ctx, W, H, (x, y, i) => {
    const l = D[i]; let on = false
    const g = 6, a = x + y, b = x - y + 10000
    if (l > 0.2 && a % g < 1.6) on = true
    if (l > 0.44 && b % g < 1.6) on = true
    if (l > 0.66 && (a % g >= 3 && a % g < 4.6)) on = true
    if (l > 0.84 && (b % g >= 3 && b % g < 4.6)) on = true
    return on ? ink : light
  }),
  riso: (ctx, W, H, D) => pixmap(ctx, W, H, (x, y, i) => {
    const sa = (yy: number, xx: number) => {
      xx = clamp(xx, 0, W - 1) | 0; yy = clamp(yy, 0, H - 1) | 0
      return D[yy * W + xx]
    }
    const A = sa(y - 1, x - 2) > 0.42, B = sa(y + 1, x + 2) > 0.44
    let c: RGB = [CREAM[0], CREAM[1], CREAM[2]]
    if (B) c = [c[0] * SIENNA_RGB[0] / 255, c[1] * SIENNA_RGB[1] / 255, c[2] * SIENNA_RGB[2] / 255]
    if (A) c = [c[0] * CRIMSON_RGB[0] / 255, c[1] * CRIMSON_RGB[1] / 255, c[2] * CRIMSON_RGB[2] / 255]
    return c
  }),
  // pure two-tone — pixelate to a chunky grid, then hard threshold. starkest.
  '1bit': (ctx, W, H, D, light, ink) => {
    const S = 3
    pixmap(ctx, W, H, (x, y) => {
      const d = D[(((y / S) | 0) * S) * W + ((x / S) | 0) * S]
      return clamp((d - 0.5) * 1.5 + 0.5) > 0.5 ? ink : light
    })
  },
  // newsprint halftone — fine round dots (crimson ink on cream paper). Keeps
  // per-pixel detail so faces stay legible, while the dot screen reads clearly
  // different from the diagonal hatch. CELL = dot spacing.
  dither: (ctx, W, H, D, light, ink) => {
    const CELL = 4, half = CELL / 2
    pixmap(ctx, W, H, (x, y, i) => {
      const d = clamp((D[i] - 0.5) * 1.12 + 0.5) // gentle contrast — don't crush detail
      const dx = (x % CELL) - half + 0.5, dy = (y % CELL) - half + 0.5
      const dist = Math.hypot(dx, dy) / (Math.SQRT2 * half) // 0 centre .. 1 corner
      return d > dist ? ink : CREAM
    })
  },
}

const portCache: Record<string, string> = {}

export type PortraitEffect = 'duotone' | 'posterize' | 'hatch' | 'riso' | 'dither' | '1bit'

export function generatePortrait(name: string, effect: PortraitEffect = 'duotone'): string {
  const key = `${name}|${effect}`
  if (portCache[key]) return portCache[key]
  const W = 240, H = 280
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  const D = lumField(name, W, H)
  const light = PASTEL[hash(name) % PASTEL.length]
  const ink = inkFor(name)
  ;(FX[effect] ?? FX.duotone)(ctx, W, H, D, light, ink)
  const url = cv.toDataURL('image/png')
  portCache[key] = url
  return url
}

/* Read a real image's darkness into the same luminance field the FX pipeline
   expects (0 = light/pastel, 1 = ink). Cover-fits the photo to W×H and applies
   a gentle contrast boost so the riso effects read with punch. */
function imageToDarkness(img: HTMLImageElement, W: number, H: number): Float32Array {
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  const ir = img.width / img.height, tr = W / H
  let sw: number, sh: number, sx: number, sy: number
  if (ir > tr) { sh = img.height; sw = sh * tr; sx = (img.width - sw) / 2; sy = 0 }
  else { sw = img.width; sh = sw / tr; sx = 0; sy = (img.height - sh) / 2 }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)
  const data = ctx.getImageData(0, 0, W, H).data
  const D = new Float32Array(W * H)
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2]
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    const dark = 1 - lum
    D[i] = clamp((dark - 0.5) * 1.25 + 0.5) // mild contrast around mid-grey
  }
  return D
}

/* Same effect pipeline as generatePortrait, but sourced from a real photo.
   Async because the image must load first. */
export function generatePortraitFromImage(
  name: string,
  src: string,
  effect: PortraitEffect = 'duotone',
): Promise<string> {
  const key = `img|${src}|${effect}`
  if (portCache[key]) return Promise.resolve(portCache[key])
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const W = 240, H = 280
      const cv = document.createElement('canvas')
      cv.width = W; cv.height = H
      const ctx = cv.getContext('2d')!
      const D = imageToDarkness(img, W, H)
      const light = PASTEL[hash(name) % PASTEL.length]
      const ink = inkFor(name)
      ;(FX[effect] ?? FX.duotone)(ctx, W, H, D, light, ink)
      const url = cv.toDataURL('image/png')
      portCache[key] = url
      resolve(url)
    }
    img.onerror = reject
    img.src = src
  })
}
