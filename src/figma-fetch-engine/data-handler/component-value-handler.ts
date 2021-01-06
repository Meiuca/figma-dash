import FigmaDashCore from "figma-dash-core";

import { ComponentProps, SignedString, StyleAttributes } from "../../../types";

export default function (
  tokenValue: SignedString,
  attributes: StyleAttributes,
  core: FigmaDashCore
) {
  if (!tokenValue.chars || attributes.category !== core.config.ds)
    return tokenValue;

  let componentPropsRegExp = /(.+):(.+)(?:;|\n|$)/;

  let componentProps: ComponentProps[] = [];

  while (componentPropsRegExp.test(tokenValue.chars)) {
    let mappedChars = componentPropsRegExp.exec(tokenValue.chars);

    if (!mappedChars || !mappedChars[0] || !mappedChars[1] || !mappedChars[2])
      break;

    tokenValue.chars = tokenValue.chars.replace(mappedChars[0], "");

    mappedChars[2] = mappedChars[2].replace(/^\s*/g, "");

    let parsedChars = (/[A-Za-z0-9\-_]+/.exec(mappedChars[2]) || [""])[0];

    let parsedItem = core.functions.tokenNameRegexTest(mappedChars[2])
      ? "{" + parsedChars!.replace(/-/g, ".") + "}"
      : parsedChars!.replace(/;/g, "");

    componentProps.push({
      name: mappedChars[1],
      item: parsedItem,
    });
  }

  return componentProps.length > 0 ? componentProps : tokenValue;
}
