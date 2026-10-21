import healthyTomatoLeaf from "../assets/mockLeafImages/Healthy_tomato_leaf.jpg";
import mirchiDisease1 from "../assets/mockLeafImages/mirchi_disease_1.jpg";
import mirchiDisease2 from "../assets/mockLeafImages/mirchi_disease_2.jpg";
import mirchiDisease3 from "../assets/mockLeafImages/mirchi_disease_3.jpg";
import tomatoDisease1 from "../assets/mockLeafImages/tomato_disease_1.jpeg";
import tomatoDisease2 from "../assets/mockLeafImages/tomato_disease_2.jpeg";
import tomatoDisease3 from "../assets/mockLeafImages/tomato_disease_3.jpeg";
import tomatoDisease4 from "../assets/mockLeafImages/tomato_disease_4.jpeg";

const HISTORY_LEAF_MAP = {
  "hist-1": tomatoDisease1, // Tomato Early Blight (11% affected - mild)
  "hist-2": tomatoDisease2, // Tomato Leaf Miner (14% affected)
  "hist-3": tomatoDisease3, // Tomato Bacterial Spot (22% affected)
  "hist-4": healthyTomatoLeaf, // Tomato Healthy (0% affected)
  "hist-5": tomatoDisease4, // Tomato Early Blight (24% affected - severe)
  "hist-6": mirchiDisease2, // Chilli Leaf Curl (19% affected)
  "hist-7": mirchiDisease1, // Chilli Bacterial Spot (16% affected)
  "hist-8": mirchiDisease3, // Cucumber Powdery Mildew (21% affected)
};

export function getLeafImage({
  diseaseId,
  affectedAreaPercent = 0,
  cropId,
  entryId,
} = {}) {
  if (entryId && HISTORY_LEAF_MAP[entryId]) {
    return HISTORY_LEAF_MAP[entryId];
  }

  if (diseaseId === "healthy") {
    return healthyTomatoLeaf;
  }

  if (diseaseId === "earlyBlight") {
    return affectedAreaPercent > 20 ? tomatoDisease4 : tomatoDisease1;
  }

  if (diseaseId === "leafMiner") {
    return tomatoDisease2;
  }

  if (diseaseId === "bacterialSpot") {
    return cropId === "chilli" ? mirchiDisease1 : tomatoDisease3;
  }

  if (diseaseId === "leafCurl") {
    return mirchiDisease2;
  }

  if (diseaseId === "powderyMildew") {
    return mirchiDisease3;
  }

  if (cropId === "chilli") {
    return mirchiDisease1;
  }

  if (cropId === "cucumber" || cropId === "pumpkin") {
    return mirchiDisease3;
  }

  return tomatoDisease1;
}

const SPOT_CANDIDATES = [
  { cx: 260, cy: 180, r: 16 },
  { cx: 310, cy: 230, r: 22 },
  { cx: 230, cy: 250, r: 14 },
  { cx: 330, cy: 170, r: 15 },
  { cx: 280, cy: 130, r: 12 },
  { cx: 210, cy: 220, r: 13 },
  { cx: 340, cy: 260, r: 16 },
  { cx: 260, cy: 280, r: 12 },
  { cx: 275, cy: 220, r: 14 },
  { cx: 350, cy: 210, r: 11 },
];

function getActiveSpots(diseaseId, affectedAreaPercent = 0) {
  const pct = Math.max(0, Number(affectedAreaPercent) || 0);
  if (diseaseId === "healthy" || pct <= 0) {
    return [];
  }
  const count = Math.max(
    2,
    Math.min(SPOT_CANDIDATES.length, Math.round((pct / 25) * SPOT_CANDIDATES.length))
  );
  const rScale = 0.8 + (pct / 30) * 0.5;

  return SPOT_CANDIDATES.slice(0, count).map((s) => ({
    cx: s.cx,
    cy: s.cy,
    r: Number((s.r * rScale).toFixed(1)),
  }));
}

function buildBaseLeafSvg(contentInside = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="#e2e8f0"/><path d="M300,80 C180,120 120,240 220,320 C320,400 420,280 380,180 Z" fill="#2e7d32"/><path d="M300,80 L280,320" stroke="#fef08a" stroke-width="4"/><path d="M295,140 C260,150 220,180 200,200" stroke="#fef08a" stroke-width="2" opacity="0.6" fill="none"/><path d="M290,200 C330,210 360,230 380,240" stroke="#fef08a" stroke-width="2" opacity="0.6" fill="none"/><path d="M285,260 C250,270 230,290 220,300" stroke="#fef08a" stroke-width="2" opacity="0.6" fill="none"/>${contentInside}</svg>`;
}

export function getHeatmapImage({ diseaseId, affectedAreaPercent = 0 } = {}) {
  const spots = getActiveSpots(diseaseId, affectedAreaPercent);
  const colors = ["#ef4444", "#f97316", "#eab308"];

  const blobsSvg = spots
    .map((s, i) => {
      const col = colors[i % colors.length];
      const blobR = (s.r * 2.2).toFixed(1);
      return `<circle cx="${s.cx}" cy="${s.cy}" r="${blobR}" fill="${col}" opacity="0.75"/>`;
    })
    .join("");

  const spotsSvg = spots
    .map((s) => `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="#854d0e" opacity="0.85"/>`)
    .join("");

  const label =
    diseaseId === "healthy" || spots.length === 0
      ? "Heatmap: No Disease Detected"
      : "Grad-CAM Heatmap Active (High Focus Area)";

  const textSvg = `<text x="300" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="#d97706" text-anchor="middle">${label}</text>`;

  const svg = buildBaseLeafSvg(`${spotsSvg}${blobsSvg}${textSvg}`);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default {
  getLeafImage,
  getHeatmapImage,
};
