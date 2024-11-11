import React from 'react';
import '../css/about.css'

function About() {
  return (
    <div className='about-container'>
    <div style={{padding: '20px', textAlign: 'center'}}>
      <h2>About Us</h2>
      <p>
        Welcome to TasteTracker – your go-to app for organizing all your
        favorite recipes in one convenient place! At TasteTracker, we believe
        that cooking and meal planning should be fun, simple, and accessible to
        everyone, whether you’re a seasoned chef or just starting on your
        culinary journey.
      </p>
      <h3>How It Works</h3>
      <p>
        Our Recipe List feature is designed to make meal prep and grocery
        shopping easier than ever: Effortless Organization: Add your favorite
        recipes to your personal Recipe List. Organize everything just the way
        you like! Detailed Ingredient Lists: View a comprehensive list of
        ingredients for each recipe, so you can be fully prepared before you
        start cooking. One-Click Add: Simply click on any recipe name to add all
        the ingredients you need to your shopping list. It’s perfect for
        planning your meals in advance or making a quick grocery run.
      </p>
      <h3>Our Mission</h3>
      <p>
        Our mission is to connect people with amazing food experiences by making
        cooking and meal planning easier, more organized, and more enjoyable. We
        want to inspire you to create delicious meals and help you keep track of
        all the ingredients and recipes you love.
      </p>
      <p>Let #TasteTracker be your companion in the kitchen – happy cooking!</p>
    </div>
    </div>
  );
}

export default About;
