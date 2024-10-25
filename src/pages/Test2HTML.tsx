import { useState } from "react";
import Tabs from "../components/Tabs";
import { outputTest2DataForm, test2TabData, test2Years } from "../constants";
import { Test2DatasType, Test2InputType, Test2TabType } from "../types/test2.type";
import testJson from "../../test.json";
import Test2TableHTML from "../components/test2/Test2TableHTML";

export default function Test2HTML() {
  const [tab, setTab] = useState<Test2TabType>("BS");

  const transformData = (inputData: Test2InputType) => {
    const mapData = (dataArray: Test2DatasType[]) => {
      return test2Years.map((year) => ({
        stDate: year,
        data: dataArray.reduce(
          (acc, item) => {
            acc[item.coNod] = "";
            return acc;
          },
          {} as { [key: string]: string },
        ),
      }));
    };

    const bss = mapData(inputData.val.BS);
    const iss = mapData(inputData.val.IS);

    return {
      ...outputTest2DataForm,
      bss,
      iss,
    };
  };

  const test2Datas = transformData(testJson);

  return (
    <div className="flex w-full justify-center py-28">
      <div className="flex w-[902px] flex-col gap-10">
        <h2 className="w-full border-b border-gray-200 py-3 text-3xl font-bold">재무정보</h2>
        <Tabs datas={test2TabData} tab={tab} setTab={setTab} />
        <div className="mt-7 flex justify-between">
          ※ 자동조회 데이터가 없을 경우 직접 입력하거나, 표준재무제표 PDF파일을 업로드해 주세요.
          <span className="text-gray-400">(단위: 천원)</span>
        </div>
        <Test2TableHTML tab={tab} outputDatas={test2Datas} />
      </div>
    </div>
  );
}
