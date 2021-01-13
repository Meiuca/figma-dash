const FigmaDash = require("../dist").default;

FigmaDash.init().then((fd) => {
  fd.importFromFigma({ convert: true }).finally(() => {
    require("meiuca-engine-fonts").default(fd.core);
  });
});
