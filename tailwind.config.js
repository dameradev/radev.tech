const baseFontSize = 10;


function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgba(var(${variableName}))`
  }
}
const themes = {
  skin: {
    base: "var(--color-background)",
    "base-muted": "var(--color-background-muted)",
    "base-md": "var(--color-background-medium)",
    focus: "var(--color-focus)",
    anchor: "var(--color-anchor)",
    "anchor-hover": "var(--color-anchor-hover)",
    fg: "var(--color-text)",
    "fg-muted": "var(--color-text-muted)",
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    header: withOpacity("--color-header"),
    "header-fg": withOpacity("--color-header-text"),
  },
}

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
   
  theme: {
    extend: {
      
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce(
            (acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` 		 }),
            {}
          ),
      }),
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme("colors.fg-muted"),
            a: {
              color: theme("colors.anchor"),
              "&:hover": {
                color: theme("colors.anchor-hover"),
              },
              code: { color: theme("colors.focus") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.fg"),
              fontFamily: "Exo",
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.fg"),
              fontFamily: "Exo",
            },
            h3: {
              fontWeight: "700",
              fontFamily: "Exo",
              color: theme("colors.fg"),
            },
            "h4,h5,h6": {
              fontFamily: "Exo",
              fontWeight: "600",
              color: theme("colors.fg"),
            },
            code: {
              color: theme("colors.bg"),
              backgroundColor: theme("colors.focus"),
            },
            details: {
              backgroundColor: theme("colors.bg"),
            },
            hr: { borderColor: theme("colors.base-muted") },
            "ol li:before": {
              fontWeight: "600",
              color: theme("colors.fg-muted"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.fg-muted"),
            },
            strong: { color: theme("colors.fg") },
            thead: {
              color: theme("colors.fg"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.base-muted"),
              },
            },
            blockquote: {
              fontSize: "1.5rem",
              color: theme("colors.fg"),
              borderLeftColor: theme("colors.fg-muted"),
            },
          },
        },
      }),
      colors: themes.skin,
      backgroundColor: themes,
      textColor: themes,
      borderColor: themes,
      ringColor: themes,
      divideColor: themes,
      ringOffsetColor: themes,
      placeholderColor: themes,
      gradientColorStops: themes,
      fontSize: {
        xs: [
          `${(16 * 0.75) / baseFontSize}rem`, /* 12px */
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem` /* 16px */,
          },
        ],
        sm: [
          `${(16 * 0.875) / baseFontSize}rem`, /* 14px */
          {
            lineHeight: `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          },
        ],
        base: [
          `${(16 * 1) / baseFontSize}rem`, /* 16px */
          {
            lineHeight: `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          },
        ],
        lg: [
          `${(16 * 1.125) / baseFontSize}rem`, /* 18px */
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        xl: [
          `${(16 * 1.25) / baseFontSize}rem`, /* 20px */
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        "2xl": [
          `${(16 * 1.5) / baseFontSize}rem`, /* 24px */
          {
            ineHeight: `${(16 * 2) / baseFontSize}rem` /* 32px */,
          },
        ],
        "3xl": [
          `${(16 * 1.875) / baseFontSize}rem`, /* 30px */
          {
            lineHeight: `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          },
        ],
        "4xl": [
          `${(16 * 2.25) / baseFontSize}rem`, /* 36px */
          {
            lineHeight: `${(16 * 2.5) / baseFontSize}rem` /* 40px */,
          },
        ],
        "5xl": [
          `${(16 * 3) / baseFontSize}rem`, /* 48px */
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "6xl": [
          `${(16 * 3.75) / baseFontSize}rem`, /* 60px */
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "7xl": [
          `${(16 * 4.5) / baseFontSize}rem`, /* 72px */
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "8xl": [
          `${(16 * 6) / baseFontSize}rem`, /* 96px */
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
        "9xl": [
          `${(16 * 8) / baseFontSize}rem`, /* 128px */
          {
            lineHeight: (16 * 1) / baseFontSize,
          },
        ],
      },
    },
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env',
  ],
}
