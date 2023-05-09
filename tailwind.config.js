

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false,
  variants: {
    scrollbar: ["dark"],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
