import { useTranslation } from "react-i18next";
import {
  MapPin,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { WEATHER_SCENARIOS } from "../data/weather";
import { getForecastDayLabels } from "../utils/formatDate";

export default function WeatherPage() {
  const { t, i18n } = useTranslation();
  const { weatherId } = useApp();

  const currentLang = i18n.language;
  const weather = WEATHER_SCENARIOS[weatherId] || WEATHER_SCENARIOS.clear;
  const forecastLabels = getForecastDayLabels(currentLang);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
      {/* 1. Location row: map-pin icon + "तुमचा तालुका" */}
      <div className="flex items-center gap-2 text-primary font-bold text-base md:text-lg">
        <MapPin className="w-5 h-5 text-primary shrink-0" />
        <span>{t("weather.location")}</span>
      </div>

      {/* 2. Current-weather card */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="text-5xl leading-none select-none">{weather.icon}</span>
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-text">
                {weather.current.tempC}°C
              </span>
              <span className="text-xs md:text-sm text-muted font-semibold">
                {t("weather.todayLabel")}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm text-muted font-medium mt-1">
              <span>
                {t("weather.humidity")} {weather.current.humidity}%
              </span>
              <span className="text-slate-300">|</span>
              <span>
                {t("weather.wind")} {weather.current.windKmh} km/h
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted/60 shrink-0" />
      </div>

      {/* 3. 5-day forecast */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {weather.forecast.map((day, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-border p-3 text-center shadow-2xs flex flex-col items-center justify-between min-h-[96px]"
          >
            <span className="text-xs font-bold text-muted">
              {forecastLabels[idx] || ""}
            </span>
            <span className="text-xl md:text-2xl my-1 select-none">{day.icon}</span>
            <span className="text-xs font-semibold text-text">
              {day.high}°/{day.low}°
            </span>
          </div>
        ))}
      </div>

      {/* 4. Spray banner: false -> warn tokens, true -> success tokens */}
      <div
        className={`rounded-2xl border p-4 md:p-5 shadow-xs flex items-start gap-3.5 transition-all ${
          weather.spraySuitable
            ? "bg-success-bg border-success-border text-success-text"
            : "bg-warn-bg border-warn-border text-warn-text"
        }`}
      >
        {weather.spraySuitable ? (
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-warn shrink-0 mt-0.5" />
        )}
        <div className="text-xs md:text-sm">
          <p className="font-bold text-sm md:text-base mb-0.5">
            {weather.spraySuitable
              ? t("weather.spraySuitableTitle")
              : t("weather.sprayNotSuitableTitle")}
          </p>
          <p className="leading-relaxed opacity-95">
            {weather.sprayNote?.[currentLang] || weather.sprayNote?.mr}
          </p>
        </div>
      </div>

      {/* 5. "शेती सल्ला" success-tint card */}
      <div className="bg-success-bg/40 border border-success-border rounded-2xl p-5 md:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm md:text-base text-success-text">
          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          <span>{t("weather.farmAdviceTitle")}</span>
        </div>

        <ul className="space-y-2 text-xs md:text-sm text-text font-medium">
          {(weather.farmAdvice?.[currentLang] || weather.farmAdvice?.mr || []).map(
            (tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
