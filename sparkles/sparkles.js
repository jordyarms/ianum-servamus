function spawnSparkle(x, y) {
  const template = document.getElementById("sparkle-template");
  const sparkle = template.cloneNode(true);
  const scale = 0.3 + Math.random() * 0.7;

  sparkle.style.display = "block";
  sparkle.classList.add("sparkle");

  const container = document.getElementById("sparkle-container");
  container.appendChild(sparkle);

  sparkle.style.position = "absolute";
  sparkle.style.left = `${x - 50}px`;
  sparkle.style.top = `${y - 50}px`;
  sparkle.style.transform = `scale(${scale})`;
  sparkle.style.transformOrigin = "center center";

  const group = sparkle.querySelector("#sparkle-group");

  const initialRotation = Math.random() * 90 - 45; // -36 to +36 degrees
  const finalRotation = Math.random() * 90 + 45; // -36 to +36 degreesinitialRotation ;
  const duration = 2000;
  const start = performance.now();

  function animateRotation(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const currentRotation =
      initialRotation + (finalRotation - initialRotation) * progress;
    group.setAttribute("transform", `rotate(${currentRotation} 50 50)`);

    if (progress < 1) {
      requestAnimationFrame(animateRotation);
    }
  }

  requestAnimationFrame(animateRotation);

  setTimeout(() => sparkle.remove(), duration + 0);
}

function getRandomPositionBiasEdges() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const spreadX = window.innerWidth / 2.2;
  const spreadY = window.innerHeight / 2.2;

  function strongEdgeBias(spread) {
    const r = Math.random();
    const exponent = 4; // higher = stronger edge bias
    const biased = Math.pow(r, 1 / exponent); // bias toward 1
    const sign = Math.random() < 0.5 ? -1 : 1;
    return sign * spread * biased;
  }

  return {
    x: centerX + strongEdgeBias(spreadX),
    y: centerY + strongEdgeBias(spreadY),
  };
}

function randomSpawnLoop() {
  const { x, y } = getRandomPositionBiasEdges();
  spawnSparkle(x, y);
  setTimeout(randomSpawnLoop, Math.random() * 500 + 25);
}

window.addEventListener("DOMContentLoaded", () => {
  randomSpawnLoop();
});
