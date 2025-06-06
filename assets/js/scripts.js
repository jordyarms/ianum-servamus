// ------------------------------
// Theme Management
// ------------------------------

function getCSSVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function applyThemeColors() {
  const copyColor = getCSSVar("--copy-color");
  const baseColor = getCSSVar("--base-color");
  const dimmedColor = getCSSVar("--dimmed-color");
  const bgColor = getCSSVar("--bg-color");

  window.currentThemeColors = { baseColor, dimmedColor };

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = copyColor;

  // Update sparkles already on screen
  document.querySelectorAll(".sparkle").forEach((sparkle) => {
    sparkle.querySelectorAll(".ray").forEach((ray) => {
      ray.setAttribute("stroke", baseColor);
    });
    const center = sparkle.querySelector("#center");
    if (center) center.setAttribute("fill", baseColor);
  });
}

const mq = window.matchMedia("(prefers-color-scheme: dark)");
mq.addEventListener("change", applyThemeColors);
applyThemeColors();
