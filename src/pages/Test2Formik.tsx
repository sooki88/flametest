import { useState } from "react";
import { Test2DatasType, Test2InputType, Test2TabType } from "../types/test2.type";
import testData from "../../test.json";
import Tabs from "../components/Tabs";
import { outputTest2DataForm, test2TabData, test2YearValues } from "../constants";
import Test2TableFormik from "../components/test2/Test2TableFormik";

const Test2Formik = () => {
  const [tab, setTab] = useState<Test2TabType>("BS");

  const headers = [{ text: "계정명", value: "names" }, ...test2YearValues];

  const initialValues: Test2InputType = {
    success: testData.success ?? true,
    val: {
      BS:
        testData.val?.BS.map((item) => ({
          ...item,
          data: { 20211231: "", 20221231: "", 20231231: "" },
        })) || [],
      IS:
        testData.val?.IS.map((item) => ({
          ...item,
          data: { 20211231: "", 20221231: "", 20231231: "" },
        })) || [],
    },
  };

  const handleSubmit = (values: Test2InputType) => {
    const mapData = (tabData: Test2DatasType[]) => {
      return test2YearValues.map((year) => ({
        stDate: year.value,
        data: tabData.reduce(
          (acc, item) => {
            acc[item.coNod] = item.data?.[year.value] || "";
            return acc;
          },
          {} as { [key: string]: string },
        ),
      }));
    };

    const bss = mapData(values.val.BS);
    const iss = mapData(values.val.IS);

    const output = {
      ...outputTest2DataForm,
      bss,
      iss,
    };

    console.log(JSON.stringify(output, null, 2));
  };

  return (
    <div className="flex w-full justify-center py-28">
      <div className="flex w-[902px] flex-col gap-10">
        <h2 className="w-full border-b border-gray-200 py-3 text-3xl font-bold">재무정보</h2>
        <Tabs datas={test2TabData} tab={tab} setTab={setTab} />
        <div className="mt-7 flex justify-between">
          ※ 자동조회 데이터가 없을 경우 직접 입력하거나, 표준재무제표 PDF파일을 업로드해 주세요.
          <span className="text-gray-400">(단위: 천원)</span>
        </div>
        <Test2TableFormik headers={headers} initialValues={initialValues} handleSubmit={handleSubmit} tab={tab} />
      </div>
    </div>
  );
};

export default Test2Formik;
