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
  data?: { [key: string]: string };
}

export interface Test2InputType {
  success: boolean;
  val: {
    BS: Test2DatasType[];
    IS: Test2DatasType[];
  };
}

export interface Test2OutputType {
  id: string;
  memberNo: string;
  customerId: string;
  refDt: number | null;
  manual: boolean;
  temp: boolean;
  bss?: Array<{
    stDate: string;
    data: { [key: string]: string };
  }>;
  iss?: Array<{
    stDate: string;
    data: { [key: string]: string };
  }>;
}
