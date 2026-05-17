import useHomeTemplateEffects from '../../../hooks/useHomeTemplateEffects';
import Intro from './sections/Intro';
import HomePageRooms from './sections/HomePageRooms';
import Services from './sections/Services';
import Video from './sections/Video';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
// import Availability from './sections/HomeAvailability';
import AboutHome from './sections/AboutHome';
import HomeAmenities from './sections/HomeAmenities';
import HomeAvailability from './sections/HomeAvailability';

export default function Home() {
  useHomeTemplateEffects();

  return (
    <div id="content" role="main">
      <Intro />
      <AboutHome />
      <HomePageRooms/>
      <Services />
      <Video />
      <HomeAmenities />
      <Experience />
      <Testimonials />
      <Blog />
      <HomeAvailability />
    </div>
  );
}
