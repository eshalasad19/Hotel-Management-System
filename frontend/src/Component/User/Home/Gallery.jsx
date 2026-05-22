import useGalleryTemplateEffects from '../../../hooks/useGalleryTemplateEffects';

import GalleryHero from './sections/GalleryHero';
import GalleryImages from './sections/GalleryImages';
import GalleryVideos from './sections/GalleryVideos';
import GalleryMixed from './sections/GalleryMixed';
import AvailabilitySection from './sections/AvailabilitySection';

export default function Gallery() {
  useGalleryTemplateEffects();

  return (
    <div id="content" role="main">
      <GalleryHero />
      <GalleryImages />
      <GalleryVideos />
      <GalleryMixed />
      <AvailabilitySection />
    </div>
  );
}