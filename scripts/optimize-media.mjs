// Compresses original photos/videos from media-src/ into web-ready files in
// public/media/, and writes src/config/media.json so the site picks them up.
//
//   media-src/hero/      photos + videos for the homepage hero
//   media-src/gallery/   everything else; subfolders become captions
//                        (e.g. gallery/After Dark/IMG_001.jpg → "After Dark")
//
// Run with: yarn media
// Already-processed files are skipped, so it's safe to re-run after adding more.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "media-src");
const OUT = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "src", "config", "media.json");

const IMAGE = /\.(jpe?g|png|webp|heic|heif|tiff?)$/i;
const VIDEO = /\.(mov|mp4|m4v|webm)$/i;

// Photos: long edge capped at 2400px — next/image serves smaller sizes per device.
const MAX_IMAGE = 2400;
// Hero video: full version for desktop, small one for phones; muted, max 20s.
const VIDEO_SIZES = [
  { suffix: "", width: 1920, crf: 26 },
  { suffix: "-sm", width: 960, crf: 28 },
];
const MAX_VIDEO_SECONDS = 20;

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.name.startsWith(".")) return [];
    return d.isDirectory() ? walk(p) : [p];
  });
}

const kb = (p) => Math.round(fs.statSync(p).size / 1024);

async function image(src, outDir, name) {
  const out = path.join(outDir, `${name}.jpg`);
  if (!fs.existsSync(out)) {
    let input = src;
    // sharp can't read iPhone HEIC; macOS `sips` converts it first.
    if (/\.hei[cf]$/i.test(src)) {
      input = path.join(outDir, `${name}.tmp.jpg`);
      execFileSync("sips", ["-s", "format", "jpeg", src, "--out", input], { stdio: "ignore" });
    }
    await sharp(input)
      .rotate()
      .resize({ width: MAX_IMAGE, height: MAX_IMAGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(out);
    if (input !== src) fs.rmSync(input);
    console.log(`  ✓ ${path.basename(src)} ${kb(src)}KB → ${kb(out)}KB`);
  }
  const { width, height } = await sharp(out).metadata();
  return { src: `/media/${path.relative(OUT, out)}`, width, height };
}

function video(src, outDir, name) {
  const files = {};
  for (const v of VIDEO_SIZES) {
    const out = path.join(outDir, `${name}${v.suffix}.mp4`);
    if (!fs.existsSync(out)) {
      execFileSync("ffmpeg", [
        "-y", "-loglevel", "error",
        "-i", src,
        "-t", String(MAX_VIDEO_SECONDS),
        "-an",
        "-vf", `scale='min(${v.width},iw)':-2,fps=30`,
        "-c:v", "libx264", "-preset", "slow", "-crf", String(v.crf),
        "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        out,
      ]);
      console.log(`  ✓ ${path.basename(src)} ${kb(src)}KB → ${path.basename(out)} ${kb(out)}KB`);
    }
    files[v.suffix === "" ? "src" : "small"] = `/media/${path.relative(OUT, out)}`;
  }
  // Poster frame: shown while the video loads (and if it never plays).
  const poster = path.join(outDir, `${name}-poster.jpg`);
  if (!fs.existsSync(poster)) {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "1", "-i", src, "-frames:v", "1", "-vf", "scale='min(1920,iw)':-2", "-q:v", "4", poster]);
  }
  // Orientation lets the site skip portrait clips on landscape screens.
  const [width, height] = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", src])
    .toString().trim().split(",").map(Number);
  return { ...files, poster: `/media/${path.relative(OUT, poster)}`, width, height };
}

async function main() {
  const manifest = { heroVideos: [], heroImages: [], gallery: [] };

  console.log("Hero");
  const heroOut = path.join(OUT, "hero");
  fs.mkdirSync(heroOut, { recursive: true });
  for (const f of walk(path.join(SRC, "hero")).sort()) {
    if (VIDEO.test(f)) manifest.heroVideos.push(video(f, heroOut, slug(path.basename(f))));
    else if (IMAGE.test(f)) manifest.heroImages.push(await image(f, heroOut, slug(path.basename(f))));
  }

  console.log("Gallery");
  const galleryRoot = path.join(SRC, "gallery");
  for (const f of walk(galleryRoot).sort()) {
    if (!IMAGE.test(f)) continue;
    const rel = path.relative(galleryRoot, path.dirname(f));
    const event = rel && rel !== "." ? rel.split(path.sep)[0] : "";
    const outDir = path.join(OUT, "gallery", event ? slug(event) : "");
    fs.mkdirSync(outDir, { recursive: true });
    manifest.gallery.push({ ...(await image(f, outDir, slug(path.basename(f)))), event });
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `\nDone: ${manifest.heroVideos.length} hero videos, ${manifest.heroImages.length} hero photos, ${manifest.gallery.length} gallery photos → src/config/media.json`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
