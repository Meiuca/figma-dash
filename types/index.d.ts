export type Entry = [string, object];

export interface Meta {
  src: string;
  filename: string;
}

export type TokenNameEntry = string | { [key: string]: { value: string } };

export type SignedString = string & { chars: string };

export type StringTupleArray = [string, string][];

export type MapTokenValueReturn = StringTupleArray | SignedString;

export interface Target {
  [key: string]: Target | TargetData;
}

export interface TargetData {
  value: SignedString | ComponentProps[];
  attributes: { category: string; type: string };
  path?: string[];
}

export interface FigmaComponent {
  name: string;
  children?: FigmaComponent[];
  characters?: string;
}

export interface ComponentProps {
  name: string;
  item: string;
}

export interface TransformedComponent extends TargetData {
  value: { name: string; item: string | { name: string; value: string } }[];
}

export interface TransformedComponentProps {
  name: string;
  item: string | { name: string; value: string };
}

export interface StyleAttributes {
  category: string;
  type: string;
}

export interface File {
  output: {
    dir: string;
  };
  destination: string;
  format?: string;
  include?: string;
  filter?: string | object;
  className: string;
  mapName: string;
}
