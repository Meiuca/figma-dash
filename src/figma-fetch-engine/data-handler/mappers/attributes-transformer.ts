import { StyleAttributes } from "../../../../types";

export default function (
  tokenNameModel: string | undefined,
  tokenNamesFlat: string[]
) {
  let attributes = {} as StyleAttributes;

  attributes.category = tokenNamesFlat[tokenNameModel == "inverted" ? 0 : 1]!;

  attributes.type = tokenNamesFlat[tokenNameModel == "inverted" ? 1 : 0]!;

  let alternativeSize = [
    attributes.category == "level" && attributes.type != "opacity",
    attributes.category == "width",
    attributes.category == "radius",
  ];

  if (alternativeSize.includes(true)) attributes.category = "size";

  return attributes;
}
