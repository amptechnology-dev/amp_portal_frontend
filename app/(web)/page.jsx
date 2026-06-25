import HeroSection from "./Hero/page";
import AboutSection from "./about/page";
import ServiceGrid from "./service/page";
import ContactSection from "./contact/page";
import TeamPage from "./team/page";
import { GallerySmall } from "./gallery/page";
import Faq from "./faq/page";
import NoticeAndAds from "./component/NoticeAndAds";
import Product from "./Products/page";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <Product />
      {/* <NoticeAndAds /> */}
      <GallerySmall />
      <ServiceGrid />
      <TeamPage />
      <ContactSection />
      <Faq />
    </main>
  );
}
