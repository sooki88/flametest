import { ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState } from "react"
import { ShareholderListType } from "./types/app.type";
import { initialShareholder } from "./constants";
import Button from "./components/Button";

function App() {
  const [total, setTotal] = useState<number | null>(null);
  const [shareholderList, setShareholderList] = useState<ShareholderListType[]>([initialShareholder]);
  const [errMsgRatioSum, setErrMsgRatioSum] = useState<string | null>(null);

  const onChangeTotal:ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrMsgRatioSum(null);
    const value = parseInt(e.target.value, 10);
    setTotal(isNaN(value) ? null : value);
  }

  const updateList = useCallback(() => {
    if (!total) return;

    const newList = shareholderList.map((list) => ({
      ...list,
      shareRatio: total > 0 && list.shareNum ? (list.shareNum / total) * 100 : 0,
    }));
    setShareholderList(newList);
  }, [total, shareholderList]);

  const onChangeList = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number, id: 'name' | 'shareNum') => {
      setErrMsgRatioSum(null);
      const value = e.target.value;
      const newShareholder = {
        ...shareholderList[index],
        [id]: id === 'shareNum' ? parseInt(value, 10) : value,
        shareRatio: id === 'shareNum' && total && total > 0 && value ? (Number(value) / total) * 100 : 0,
      };
      const updatedList = [...shareholderList];
      updatedList[index] = newShareholder;
      setShareholderList(updatedList);
    },
    [total, shareholderList]
  );

  const onClickDelete = useCallback(
    (e:React.MouseEvent<HTMLButtonElement>, index: number) => {
      e.preventDefault();
      if (shareholderList.length === 1) return;
      const updatedList = shareholderList.filter((_, i) => i !== index);
      setShareholderList(updatedList);
    },
    [shareholderList]
  );

  const ratioSum = useMemo(()=>{
    const sum = shareholderList.reduce((acc, cur) => acc + Number(cur.shareRatio), 0);
    if (sum > 100) setErrMsgRatioSum('보유 주식수의 합은 총 주식수를 넘을 수 없습니다. 보유 주식수를 확인해주세요.');
    return sum;
  }, [shareholderList])

  const onClickAdd = () => {
    setShareholderList((prev) => {
      const lastIndex = prev[prev.length - 1 ].index!;
      return [...prev, {...initialShareholder, index: lastIndex + 1}];
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let i = 0; i < shareholderList.length; i++ ){
      if (!shareholderList[i].name || shareholderList[i].shareNum === null) {
        alert('모든 주주의 이름과 보유 주식수를 입력해주세요.');
        return;
      }
    }

    if(ratioSum < 100) {
      alert('합산 지분율이 100% 미안입니다. 모든 주주를 입력해주세요.');
      return;
    }

    const output = {
      total,
      ratioSum,
      shareholderList,
    };
  
    console.log(JSON.stringify(output, null, 2)); 
  }
  
  return (
      <form onSubmit={onSubmit} className="flex flex-col gap-20 p-5">
        <h2>과제 - 1</h2>
        <h3>총 발행 주식수 입력 후 주주들 배분</h3>
        <div className="flex flex-row gap-3">
          <label htmlFor="total">총 주식수 : </label>
          <input id="total" type="number" value={total ?? ""} onChange={onChangeTotal} onBlur={updateList} placeholder="0" min="0" className="px-2 border border-black rounded"/>
        </div>
        <ul className="flex flex-col gap-10">
          {shareholderList?.map((list, index)=> 
            <li key={index} className="relative flex items-center w-full gap-20 px-8 py-10 bg-gray-200 rounded">
              <span className="absolute left-8 top-[-10px]">주주</span>
              <div className="flex flex-col gap-5">
                <label htmlFor={`sharholder${index}name`}>이름</label>
                <input id={`sharholder${index}name`} type="text" value={list.name} onChange={(e) => onChangeList(e, index, 'name')} placeholder="주주명" required className="px-2 border border-black rounded" />
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor={`sharholder${index}shareNum`}>보유 주식수</label>
                <input id={`sharholder${index}shareNum`} type="number" value={list.shareNum ?? ""} onChange={(e) => onChangeList(e, index, 'shareNum')} placeholder="0" required className="px-2 border border-black rounded" />
              </div>
              <div className="flex flex-col gap-5">
                지분율
                <span>{shareholderList[index].shareRatio}%</span>
              </div>
              <Button onClick={(e) => onClickDelete(e, index)}>삭제</Button>
            </li>
          )}
        </ul>
        <div className="flex items-center justify-between w-full">
          <p>합산 지분율 : {ratioSum ?? '지분율의 합'} <span className="text-base text-red-500">{errMsgRatioSum}</span></p>
          <div className="flex gap-5">
            <Button onClick={onClickAdd}>주주 추가</Button>
            <Button type="submit">저장</Button>
          </div>
        </div>
      </form>
  )
}

export default App
