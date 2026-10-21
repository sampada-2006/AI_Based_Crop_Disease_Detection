import HeroBanner from "../components/home/HeroBanner";
import ActionCards from "../components/home/ActionCards";
import OutbreakBanner from "../components/home/OutbreakBanner";

export default function HomePage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
      <HeroBanner />
      <ActionCards />
      <OutbreakBanner />
    </div>
  );
}
