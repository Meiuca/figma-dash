import { ConfigHandler } from "figma-dash-core";

import {
  TransformedComponent,
  TransformedComponentProps,
} from "../../../types";

const config = ConfigHandler.handle();

export const name = "scss/components";

export const formatter = ({
  allProperties,
}: {
  allProperties: TransformedComponent[];
}) => {
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

  allProperties.forEach((prop) => {
    if (prop.attributes.category === (config.ds || "component")) {
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
};
