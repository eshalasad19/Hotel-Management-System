import useContactTemplateEffects from '../../../hooks/useContactTemplateEffects';

import ContactHero from './sections/ContactHero';
import ContactInfo from './sections/ContactInfo';
import ContactFormSection from './sections/ContactFormSection';
import ContactMap from './sections/ContactMap';

import AvailabilitySection from './sections/AvailabilitySection';

export default function ContactUs() {
  useContactTemplateEffects();

  return (
    <div id="content" role="main">
      <ContactHero />
      <ContactInfo />
      <ContactFormSection />
      <ContactMap />
    </div>
  );
}