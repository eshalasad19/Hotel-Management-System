import useSpaTemplateEffects from '../../../hooks/useSpaTemplateEffects';

import SpaHero from './sections/SpaHero';
import SpaAbout from './sections/SpaAbout';
import SpaServices from './sections/SpaServices';
import SpaVideo from './sections/SpaVideo';
import SpaWhyChoose from './sections/SpaWhyChoose';
import SpaTestimonials from './sections/SpaTestimonials';
import SpaCTA from './sections/SpaCTA';

export default function Spa() {
  useSpaTemplateEffects();

  return (
    <div id="content" role="main">
      <SpaHero />
      <SpaAbout />
      <SpaServices />
      <SpaVideo />
      <SpaWhyChoose />
      <SpaTestimonials />
      <SpaCTA />
    </div>
  );
}