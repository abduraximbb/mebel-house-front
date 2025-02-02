/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins", sans-serif'],
        "poppins-bold": ['"Poppins Bold", sans-serif'],
        montserrat: ['"Montserrat", sans-serif'],
      },
      colors: {
        "bg-primary": "#B88E2F",
      },
      backgroundImage: {
        "hero-image": 'url("/assets/hero_home.png")',
        "shop-image": 'url("/assets/hero_home.png")',
        "background-image": 'url("/assets/background.png")', // ✅ Xato to‘g‘rilandi
      },
    },
    container: {
      // ✅ `container` faqat bir marta kiritildi
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1286px",
      },
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "0",
        xl: "0",
        "2xl": "0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")], // ✅ Plagin tekshirildi
};
