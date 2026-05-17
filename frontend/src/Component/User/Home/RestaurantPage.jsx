import React from 'react';

// Custom Hook Import
import useRestaurantEffects from '../../../hooks/useRestaurantEffects';

// Sections Imports
import RestaurantHero from './sections/RestaurantHero';
import RestaurantAbout from './sections/RestaurantAbout';
import RestaurantMenu from './sections/RestaurantMenu';
import { RestaurantVideo } from './sections/RestaurantVideo'; 
import { RestaurantValues } from './sections/RestaurantValues';
// import TestimonialsSection from './sections/TestimonialsSection'; // Agla/bacha hua testimonial part yahan import karlein

const RestaurantPage = () => {
  
  // Dynamic Scroll & Hooks Logic trigger
  useRestaurantEffects();

  return (
    <div className="restaurant-page">
      {/* 1. Hero Section */}
      <RestaurantHero />

      {/* Main Content Layout */}
      <div id="content" role="main">
        
        {/* 2. Timing and Info Section */}
        <RestaurantAbout />

        {/* 3. Menu Category Tabs Section */}
        <RestaurantMenu />

        {/* 4. Luxury Experience Video Banner */}
        <RestaurantVideo />

        {/* 5. Features/Core Values Grid */}
        <RestaurantValues/>

        {/* 6. Testimonials Swiper
        <TestimonialsSection /> */}
      </div>
    </div>
  );
};

export default RestaurantPage;