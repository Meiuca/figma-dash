import { getOutArray, parseComponentProps } from "./component-props-parser";

import { FigmaComponent } from "../../../types";

export default function handleChildren(component: FigmaComponent) {
  if (component.children) {
    component.children.forEach((child) => {
      if (child.children) {
        parseComponentProps(child);

        handleChildren(child);
      } else {
        parseComponentProps(component);
      }
    });
  } else {
    parseComponentProps(component);
  }

  return getOutArray();
}
