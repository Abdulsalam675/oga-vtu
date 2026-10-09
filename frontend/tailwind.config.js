export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        error: "var(--error)",
      },
      textColor: {
        default: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-tertiary)",
      },
      backgroundColor: {
        base: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        tertiary: "var(--bg-tertiary)",
      },
      borderColor: {
        light: "var(--border-light)",
        medium: "var(--border-medium)",
      },
    },
  },
  plugins: [],
};
