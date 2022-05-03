module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        chat: "url('https://cdn.pixabay.com/photo/2016/02/11/01/53/wall-paper-1193001_960_720.jpg')",
      },
    },
    colors: {
      primary: "#00a884",
      secondary: "#D6F3E9",
      light: "#F8FAF9",
      dark: "#42554F",
      gray: "#EFEFEF",
      grayLight: "#F2F2F2",
      message: "#D9FFCE",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
