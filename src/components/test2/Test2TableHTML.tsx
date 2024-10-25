import { Test2InputType, Test2OutputType, Test2TabType } from "../../types/test2.type";
import { useState } from "react";
import { test2YearValues } from "../../constants";
import testJson from "../../../test.json";
import DownloadIcon from "../../assets/download_wht.svg";
export default function Test2TableHTML({
  tab,
  inputDatas = testJson,
  outputDatas,
}: {
  tab: Test2TabType;
  inputDatas?: Test2InputType;
  outputDatas: Test2OutputType;
}) {
  const [formData, setFormData] = useState(outputDatas);
  const tabValue = tab === "BS" ? "bss" : "iss";

  const headers = [{ text: "계정명", value: "names" }, ...test2YearValues];
  const headerKeys = headers.map((header) => header.value);
  const inputDataKey = inputDatas.val[tab].map((key) => ({ text: key.name, value: key.coNod }));

  const onClick = () => {
    console.log(formData);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, year: string, coNod: string) => {
    const newValue = e.target.value;
    if (isNaN(Number(newValue))) {
      alert("숫자만 입력 가능합니다.");
      return;
    }
    setFormData((prev) => {
      const updatedData = { ...prev };
      const findItem = updatedData[tabValue]?.find((item) => item.stDate === year);
      if (findItem) {
        findItem.data = { ...findItem.data, [coNod]: newValue };
      }
      return updatedData;
    });
  };

  return (
    <table className="w-full overflow-hidden rounded-lg">
      <thead className="bg-gray-400 font-bold text-white">
        <tr>
          {headers.map((header) => (
            <th key={header.value} className="">
              {header.text}
              {header.value !== "names" && (
                <button type="submit" onClick={onClick}>
                  <img src={DownloadIcon} alt="다운로드 버튼" className="inline h-6 w-6" />
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {inputDataKey.map((key, index) => {
          return (
            <tr key={`${key.value}-${index}`}>
              {headerKeys.map((headerKey, headerIndex) => {
                const findValue = (year: string) => {
                  return formData[tabValue]?.find((value) => value.stDate === year)?.data[key.value] || "";
                };

                return (
                  <td key={`${headerKey}-${headerIndex}`}>
                    {headerKey === headerKeys[0] ? (
                      <div>{inputDataKey[index].text}</div>
                    ) : headerKey === headerKeys[1] ? (
                      <input
                        type="text"
                        value={findValue(headerKeys[1])}
                        onChange={(e) => onChangeInput(e, headerKeys[1], key.value)}
                        className=""
                      />
                    ) : headerKey === headerKeys[2] ? (
                      <input
                        type="text"
                        value={findValue(headerKeys[2])}
                        onChange={(e) => onChangeInput(e, headerKeys[2], key.value)}
                        className=""
                      />
                    ) : (
                      <input
                        type="text"
                        value={findValue(headerKeys[3])}
                        onChange={(e) => onChangeInput(e, headerKeys[3], key.value)}
                        className=""
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
