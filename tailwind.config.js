const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        screens: {
          xxs: "475px",
          sm: "600px",
          md: "728px",
          lg: "1024px",
          xl: "1320px",
          "2xl": "1536px",
        },
        center: true,
      },
      fontFamily: {
        Archivo_Black: ["Archivo Black", "sans-serif"],
        Lobster: ["Lobster", "sans-serif"],
        Oswald: ["Oswald", "sans-serif"],
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
});
