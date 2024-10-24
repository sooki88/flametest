import { useState } from "react";
import Tabs from "../components/Tabs";
import { test2TabData } from "../constants";
import { Test2TabType } from "../types/test2.type";
import Test2Table from "../components/test2/test2Table";
import testJson from "../../test.json";

export default function Test2() {
  const [tab, setTab] = useState<Test2TabType>("BS");
  const test2Datas = testJson.val[tab];

  return (
    <div className="flex w-full justify-center py-28">
      <div className="flex w-[902px] flex-col gap-10">
        <h2 className="w-full border-b border-gray-200 py-3 text-3xl font-bold">재무정보</h2>
        <Tabs datas={test2TabData} tab={tab} setTab={setTab} />
        <div className="mt-7 flex justify-between">
          ※ 자동조회 데이터가 없을 경우 직접 입력하거나, 표준재무제표 PDF파일을 업로드해 주세요.
          <span className="text-gray-400">(단위: 천원)</span>
        </div>
        <Test2Table test2Datas={test2Datas} />
      </div>
    </div>
  );
}
