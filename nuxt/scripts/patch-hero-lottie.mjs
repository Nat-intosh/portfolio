import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Post-process the Cavalry Lottie export before it is used by the app.
//
// Run after every Cavalry export:
//   npm run fix:lottie
//
// The fixes below are workarounds for the exporter:
// 1. A scale animation with a single keyframe is invalid. lottie-web falls
//    back to its default value (a huge black shape). Convert it to a static
//    scale instead.
// 2. Cavalry bakes some scale animations with one keyframe per frame and
//    ease-in/out handles on every segment. That makes the motion stop at
//    every frame boundary, which is very visible when playback is slowed
//    down. Since the sampled values already describe the motion, replace the
//    handles with linear easing.
// 3. The black logo ("logo 6") is exported with a pink outline. Remove its
//    stroke shapes so only the black fill remains.
const file = process.argv[2]
  ? pathToFileURL(resolve(process.argv[2]))
  : new URL('../app/assets/lottie/hero.json', import.meta.url)

const data = JSON.parse(await readFile(file, 'utf8'))
let staticScales = 0
let linearizedScales = 0

function removeStrokes(items) {
  if (!Array.isArray(items)) return 0

  let removed = 0
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index]
    if (item?.ty === 'st') {
      items.splice(index, 1)
      removed += 1
    } else {
      removed += removeStrokes(item?.it)
    }
  }
  return removed
}

const blackLogo = (data.layers ?? []).find((layer) => layer.nm === 'logo 6')
const removedStrokes = removeStrokes(blackLogo?.shapes)

for (const layer of data.layers ?? []) {
  const scale = layer.ks?.s
  if (!scale || scale.a !== 1 || !Array.isArray(scale.k)) continue

  if (scale.k.length === 1) {
    const value = scale.k[0]?.s
    if (!Array.isArray(value)) continue

    scale.a = 0
    scale.k = value
    staticScales += 1
    continue
  }

  const times = scale.k.map((keyframe) => keyframe.t)
  const isBakedEveryFrame = times.every(
    (time, index) => index === 0 || time - times[index - 1] === 1,
  )
  if (!isBakedEveryFrame) continue

  for (const keyframe of scale.k) {
    if (!keyframe.i || !keyframe.o) continue

    // cubic-bezier(0.333, 0.333, 0.667, 0.667) is linear.
    keyframe.i = { x: [0.333], y: [0.333] }
    keyframe.o = { x: [0.667], y: [0.667] }
  }
  linearizedScales += 1
}

await writeFile(file, JSON.stringify(data))

console.log(
  `Patched ${fileURLToPath(file)}: ` +
    `${staticScales} static scale(s), ` +
    `${linearizedScales} linearized scale animation(s), ` +
    `${removedStrokes} stroke(s) removed from logo 6.`,
)
