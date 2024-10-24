import { TabDataType, Test2TabType } from "../types/test2.type";

interface TabsType {
  datas: TabDataType[];
  tab: Test2TabType;
  setTab: React.Dispatch<React.SetStateAction<Test2TabType>>;
}

export default function Tabs({ datas, tab, setTab }: TabsType) {
  const onClick = (value: Test2TabType) => {
    setTab(value);
  };

  return (
    <div className="flex gap-2">
      {datas?.map((data) => (
        <div
          key={data.value}
          onClick={() => onClick(data.value as Test2TabType)}
          className={`flex h-20 items-center justify-center border-b-[3px] px-5 text-2xl font-bold ${tab === data.value ? "border-blue-500 text-black" : "border-white text-gray-400 hover:text-gray-500"}`}>
          {data.text}
        </div>
      ))}
    </div>
  );
}
