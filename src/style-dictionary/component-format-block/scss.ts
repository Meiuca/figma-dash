import FigmaDashCore from "figma-dash-core";

import {
  TransformedComponent,
  TransformedComponentProps,
} from "../../../types";

export const name = "scss/components";

export function formatter(
  this: FigmaDashCore,
  dictionary: {
    allProperties: TransformedComponent[];
  }
) {
  let components: string[] = [],
    props: string[] = [];

  let mapValue = ({ name, item }: TransformedComponentProps) => {
    if (item && typeof item != "string") {
      let prop = `$${item.name}: ${item.value};`;

      if (!props.includes(prop)) props.push(prop);

      return `${name}: $${item.name};`;
    } else {
      return `${name}: ${item};`;
    }
  };

  dictionary.allProperties.forEach((prop) => {
    if (prop.attributes.category === (this.config.ds || "component")) {
      components.push(
        `.${prop.path?.join("-")} {\n ${prop.value
          .map(mapValue)
          .join("\n ")}\n}`
      );
    }
  });

  return (
    (props.length > 0 ? props.join("\n") + "\n\n" : "") +
    components.join("\n\n")
  );
}
