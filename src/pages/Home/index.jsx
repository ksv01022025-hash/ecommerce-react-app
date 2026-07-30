import Hero from "./sections/Hero/Hero";
import Categories from "./sections/Categories/Categories";
import NewArrivals from "./sections/NewArrivals/NewArrivals";
import DealBanner from "./sections/DealBanner/DealBanner";
import TrustBar from "./sections/TrustBar/TrustBar";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Categories />
        <NewArrivals />
        <DealBanner />
      </main>
      <TrustBar />
    </>
  );
}
