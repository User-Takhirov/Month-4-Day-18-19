/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        screens: {
          lg: "1150px",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
