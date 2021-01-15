import { StyleAttributes } from "../../../../types";

export default function (
  tokenNameModel: string | undefined,
  tokenNamesFlat: string[]
) {
  let attributes = {} as StyleAttributes;

  let category = tokenNamesFlat[tokenNameModel == "inverted" ? 0 : 1]!;

  attributes.category = category;

  switch (tokenNameModel) {
    case "inverted":
      attributes.type = tokenNamesFlat[1]!;
      break;

    /* also classic */
    default:
      attributes.type = tokenNamesFlat[0]!;
      break;
  }

  if (attributes.category == "level" && attributes.type != "opacity")
    attributes.category = "size";

  return attributes;
}
