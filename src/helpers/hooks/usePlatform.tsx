const usePlatform = () => {
  const screenWidth = typeof screen !== "undefined" && screen.width;

  const isMobile = screenWidth <= 768;

  return { screenWidth, isMobile };
};

export default usePlatform;
