const FigmaDash = require("../dist").default;

FigmaDash.init().then((fd) => {
  fd.importFromFigma({ convert: true }).finally(() => {
    // require("figma-dash-fonts").default(fd.core);
  });

  // fd.convertTokens();
});
