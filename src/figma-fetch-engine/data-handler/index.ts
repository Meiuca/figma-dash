import InitComponentsPropParser from "./component-props-parser";
import MeiucaEngineCore from "meiuca-engine-core";

import { FigmaComponent } from "../../../types";

export default function handleChildren(
  component: FigmaComponent,
  core: MeiucaEngineCore
) {
  let { getOutArray, parseComponentProps } = InitComponentsPropParser(core);

  function handleRecursively(cp: FigmaComponent) {
    if (cp.children) {
      cp.children.forEach((child) => {
        if (child.children) {
          parseComponentProps(child);

          handleRecursively(child);
        } else {
          parseComponentProps(cp);
        }
      });
    } else {
      parseComponentProps(cp);
    }
  }

  handleRecursively(component);

  return getOutArray();
}
