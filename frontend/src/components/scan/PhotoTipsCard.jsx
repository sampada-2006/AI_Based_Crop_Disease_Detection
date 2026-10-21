import { useTranslation } from "react-i18next";
import { Lightbulb } from "lucide-react";

export default function PhotoTipsCard() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#EBF7F0] border border-[#CDECD8] rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs overflow-hidden">
      {/* Left side: Heading + bullets */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-[#14532D] flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-lg bg-emerald-200/80 flex items-center justify-center text-emerald-800">
            <Lightbulb className="w-3.5 h-3.5" />
          </span>
          <span>{t("scan.tipsTitle")}</span>
        </h4>

        <ul className="space-y-2 text-xs text-[#164E2A] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>{t("scan.tipsBullet1")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>{t("scan.tipsBullet2")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>{t("scan.tipsBullet3")}</span>
          </li>
        </ul>
      </div>

      {/* Right side: Plant illustration inline SVG */}
      <div className="w-32 h-24 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 140 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="leafGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Warm background sun glow */}
          <circle cx="100" cy="30" r="30" fill="url(#sunGlow)" />

          {/* Plant Stem */}
          <path
            d="M50,90 Q65,60 80,35"
            stroke="#15803D"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lower Left Leaf */}
          <path
            d="M60,70 C40,65 30,50 42,42 C56,38 68,54 62,68 Z"
            fill="url(#leafGrad2)"
          />
          <path d="M60,68 Q45,55 42,44" stroke="#86EFAC" strokeWidth="1" fill="none" />

          {/* Lower Right Leaf */}
          <path
            d="M68,58 C85,55 98,62 94,72 C86,80 72,72 68,58 Z"
            fill="url(#leafGrad1)"
          />
          <path d="M69,60 Q82,65 92,70" stroke="#86EFAC" strokeWidth="1" fill="none" />

          {/* Top Leaf */}
          <path
            d="M80,35 C70,18 85,8 96,15 C105,24 95,38 80,35 Z"
            fill="url(#leafGrad1)"
          />
          <path d="M81,33 Q88,22 94,17" stroke="#BBF7D0" strokeWidth="1" fill="none" />

          {/* Inspecting Focus Ring / Sparkle */}
          <circle cx="50" cy="50" r="14" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.6" />
          <circle cx="50" cy="50" r="2" fill="#059669" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
