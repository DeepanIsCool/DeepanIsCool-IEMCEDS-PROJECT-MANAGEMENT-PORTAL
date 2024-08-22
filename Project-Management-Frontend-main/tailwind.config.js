/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        whitesmoke: "#f4f4f4",
        white: "#fff",
        lavender: "#e0ebff",
        black: "#000",
        royalblue: {
          "100": "#3278ff",
          "200": "#3079ff",
        },
        tomato: "#ff4b4b",
        lightgray: "#d7d7d7",
        crimson: "#d81515",
        limegreen: "#00b307",
        darkslategray: {
          "100": "#4b4b4b",
          "200": "rgba(75, 75, 75, 0.39)",
        },
        gray: "#7d7d7d",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        "general-sans": "'General Sans'",
      },
      borderRadius: {
        smi: "13px",
        "3xs": "10px",
        "2xs": "11px",
        "6xs": "7px",
        "64xl": "83px",
        "21xl": "40px",
      },
    },
    fontSize: {
      "17xl": "36px",
      "10xl": "29px",
      "3xl": "22px",
      "3xs": "10px",
      "21xl": "40px",
      "13xl": "32px",
      "5xl": "24px",
      xl: "20px",
      base: "16px",
      sm: "14px",
      "11xl": "30px",
      lgi: "19px",
      "29xl": "48px",
      "19xl": "38px",
      inherit: "inherit",
    },
    screens: {
      mq1600: {
        raw: "screen and (max-width: 1600px)",
      },
      mq1275: {
        raw: "screen and (max-width: 1275px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
