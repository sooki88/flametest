export type Test2TabType = "BS" | "IS";

export interface TabDataType {
  text: string;
  value: string;
}

export interface YearData {
  [key: string]: string | null;
}

export interface Test2DatasType {
  name: string;
  kdDepth: string;
  coNod: string;
  show: string;
  coDepth: string;
  soleShow: boolean;
  reqInput: boolean;
  reqInputSole: boolean;
  ntsCode: string;
  ntsCodeSole: string | null;
  years?: YearData[];
}
