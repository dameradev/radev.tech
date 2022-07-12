const size = {
  mobileS: "320px",
  mobileMS: "345px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "520px",
  tabletMini: "620px",
  tablet: "768px", // Standard
  laptopS: "930px",
  laptop: "1024px", // Standard
  laptopL: "1360px",
  laptopM: "1440px", // Standard
  desktop: "2560px",// Standard
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileMS: `(max-width: ${size.mobileMS})`,
  mobileL: `(max-width: ${size.mobileL})`,
  mobileXL: `(max-width: ${size.mobileXL})`,
  tabletMini: `(max-width: ${size.tabletMini})`,
  tablet: `(max-width: ${size.tablet})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopM: `(max-width: ${size.laptopM})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};