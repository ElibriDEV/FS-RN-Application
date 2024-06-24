/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    colors: {
      primary: "#5955b3",
      primaryLight: "#efeeff",
      passed: "#ffeeee",
      warning: "#ffffee",
    },
    extend: {
      fontFamily: {
        museoSans: ["MuseoSans"]
      }
    },
  },
  plugins: [],
});


//     {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

