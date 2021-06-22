const FigmaDash = require("../dist").default;

FigmaDash.init().then((fd) => {
  fd.importFromFigma({ convert: true }).then(() => {
    require("meiuca-engine-fonts").default(fd.core);
  });
});
