import MeiucaEngineCore from "meiuca-engine-core";

import {
  TransformedComponent,
  TransformedComponentProps,
} from "../../../types";

export const name = "css/components";

export function formatter(
  this: MeiucaEngineCore,
  dictionary: {
    allProperties: TransformedComponent[];
  }
) {
  let components: string[] = [],
    props: string[] = [];

  let mapValue = ({ name, item }: TransformedComponentProps) => {
    if (item && typeof item != "string") {
      let prop = `--${item.name}: ${item.value};`;

      if (!props.includes(prop)) props.push(prop);

      return `${name}: var(--${item.name});`;
    } else {
      return `${name}: ${item};`;
    }
  };

  dictionary.allProperties.forEach((prop) => {
    if (prop.attributes.category === (this.config.globals.ds || "component")) {
      components.push(
        `.${prop.path?.join("-")} {\n ${prop.value
          .map(mapValue)
          .join("\n ")}\n}`
      );
    }
  });

  return (
    (props.length > 0 ? ":root {\n " + props.join("\n ") + "\n}\n\n" : "") +
    components.join("\n\n")
  );
}
