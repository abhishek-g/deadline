function isRangeCovered(desiredRange, hardwareCameras) {
  const [[distMin, distMax], [lightMin, lightMax]] = desiredRange;
  const distStep = (distMax - distMin) / 100;
  const lightStep = (lightMax - lightMin) / 100;

  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      const dist = distMin + i * distStep;
      const light = lightMin + j * lightStep;

      const covered = hardwareCameras.some(
        ([[camDistMin, camDistMax], [camLightMin, camLightMax]]) => {
          return (
            camDistMin <= dist &&
            dist <= camDistMax &&
            camLightMin <= light &&
            light <= camLightMax
          );
        }
      );

      if (!covered) return false;
    }
  }

  return true;
}
