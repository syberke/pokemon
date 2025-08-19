import React, { useState, useLayoutEffect } from "react";

const ScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <p>Scroll Y: {scrollY}px</p>;
};

export default ScrollPosition;
