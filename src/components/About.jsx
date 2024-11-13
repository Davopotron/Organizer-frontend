import React from 'react';

function About() {
  return (
    <div
      style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'black',
      }}
    >
      <h2
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: 'rgb(30, 101, 173)',
        }}
      >
        About Us
      </h2>
      <p
        style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '40px',
          color: 'black',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Welcome to TasteTracker – your go-to app for organizing all your
        favorite recipes in one convenient place! At TasteTracker, we believe
        that cooking and meal planning should be fun, simple, and accessible to
        everyone, whether you’re a seasoned chef or just starting on your
        culinary journey.
      </p>

      <h3
        style={{
          fontSize: '28px',
          marginBottom: '20px',
          color: 'rgb(30, 101, 173)',
          fontWeight: 'bold',
        }}
      >
        How It Works
      </h3>
      <p
        style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '40px',
          color: 'black',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Our Recipe List feature is designed to make meal prep and grocery
        shopping easier than ever:
      </p>
      <ul
        style={{
          listStyleType: 'circle',
          textAlign: 'left',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '40px',
        }}
      >
        <li style={{fontSize: '18px', lineHeight: '1.6', color: 'black'}}>
          <strong>Effortless Organization:</strong> Add your favorite recipes to
          your personal Recipe List. Organize everything just the way you like!
        </li>
        <li style={{fontSize: '18px', lineHeight: '1.6', color: 'black'}}>
          <strong>Detailed Ingredient Lists:</strong> View a comprehensive list
          of ingredients for each recipe, so you can be fully prepared before
          you start cooking.
        </li>
        <li style={{fontSize: '18px', lineHeight: '1.6', color: 'black'}}>
          <strong>One-Click Add:</strong> Simply click on any recipe name to add
          all the ingredients you need to your shopping list. It’s perfect for
          planning your meals in advance or making a quick grocery run.
        </li>
      </ul>

      <h3
        style={{
          fontSize: '28px',
          marginBottom: '20px',
          color: 'rgb(30, 101, 173)',
          fontWeight: 'bold',
        }}
      >
        Our Mission
      </h3>
      <p
        style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '40px',
          color: 'black',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Our mission is to connect people with amazing food experiences by making
        cooking and meal planning easier, more organized, and more enjoyable. We
        want to inspire you to create delicious meals and help you keep track of
        all the ingredients and recipes you love.
      </p>

      <h3
        style={{
          fontSize: '28px',
          marginBottom: '20px',
          color: 'rgb(30, 101, 173)',
          fontWeight: 'bold',
        }}
      >
        Let #TasteTracker be your companion in the kitchen – happy cooking!
      </h3>
    </div>
  );
}

export default About;
