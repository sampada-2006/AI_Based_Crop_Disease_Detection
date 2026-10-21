const MARATHI_MONTHS = [
  "जानेवारी",
  "फेब्रुवारी",
  "मार्च",
  "एप्रिल",
  "मे",
  "जून",
  "जुलै",
  "ऑगस्ट",
  "सप्टेंबर",
  "ऑक्टोबर",
  "नोव्हेंबर",
  "डिसेंबर",
];

const ENGLISH_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MARATHI_WEEKDAYS = [
  "रवि",
  "सोम",
  "मंगळ",
  "बुध",
  "गुरु",
  "शुक्र",
  "शनि",
];

const ENGLISH_WEEKDAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export function formatScanDate(iso, lang = "mr") {
  if (!iso) return "";

  let year, monthIdx, day, hours, minutes;

  if (typeof iso === "string" && iso.includes("T")) {
    const [datePart, timePart] = iso.split("T");
    const [y, m, d] = datePart.split("-").map(Number);
    const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})/);
    if (timeMatch && !isNaN(y) && !isNaN(m) && !isNaN(d)) {
      year = y;
      monthIdx = m - 1;
      day = d;
      hours = Number(timeMatch[1]);
      minutes = Number(timeMatch[2]);
    }
  }

  if (year === undefined) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    year = d.getFullYear();
    monthIdx = d.getMonth();
    day = d.getDate();
    hours = d.getHours();
    minutes = d.getMinutes();
  }

  const monthName =
    lang === "mr" ? MARATHI_MONTHS[monthIdx] : ENGLISH_MONTHS[monthIdx];
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${day} ${monthName} ${year}, ${hours12}:${formattedMinutes} ${ampm}`;
}

export function getForecastDayLabels(lang = "mr") {
  const isMr = lang === "mr";
  const todayLabel = isMr ? "आज" : "Today";
  const tomorrowLabel = isMr ? "उद्या" : "Tomorrow";
  const weekdays = isMr ? MARATHI_WEEKDAYS : ENGLISH_WEEKDAYS;

  const now = new Date();
  const labels = [todayLabel, tomorrowLabel];

  for (let i = 2; i < 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    labels.push(weekdays[d.getDay()]);
  }

  return labels;
}

export default {
  formatScanDate,
  getForecastDayLabels,
};
