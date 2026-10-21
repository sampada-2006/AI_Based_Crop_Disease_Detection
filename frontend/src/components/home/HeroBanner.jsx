import { useTranslation } from "react-i18next";
import farmFieldImage from "../../assets/farm_field_image.avif";

export default function HeroBanner() {
  const { t } = useTranslation();

  return (
    <div className="relative rounded-2xl overflow-hidden h-[210px] md:h-[220px] shadow-sm select-none border border-emerald-100/60">
      <img
        src={farmFieldImage}
        alt="Farm Field Banner"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />

      {/* Soft overlay to ensure greeting text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

      {/* Greeting overlaid top-left */}
      <div className="relative z-10 pt-8 md:pt-10 px-8 max-w-xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#16302A] tracking-tight leading-tight">
          {t("home.greeting")}
        </h2>
        <p className="text-xs md:text-sm font-semibold text-[#16302A]/90 mt-1.5">
          {t("home.subGreeting")}
        </p>
      </div>
    </div>
  );
}
