import sarea from "../db/sarea.json";
import scode from "../db/scode.json";
import { useRef, useState, useEffect } from "react";

export default function Subway() {
  // 초기 데이터 저장
  const [tdata, setTdata] = useState(); // 공기 데이터
  const [tags, setTags] = useState(); // 화면에 보여줄 내용

  // ref - select에 접근
  const refSel = useRef();

  // 지하철역 리스트 만들기
  const ops = sarea.map(item => (
    <option 
      key={item["코드"]} 
      value={item["코드"]}>
      {item["측정소"]}
    </option>
  ));

  // 데이터 fetch
  const getFetchData = async (code) => {
    let url = `https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?`;
    url = `${url}serviceKey=${import.meta.env.VITE_APP_API_KEY}`;
    url = `${url}&pageNo=1&numOfRows=10&resultType=json`;
    url = `${url}&controlnumber=${new Date()
      .toISOString()
      .slice(0, 10)
      .replaceAll("-", "")}07`;
    url = `${url}&areaIndex=${code}`;

    const resp = await fetch(url);
    const data = await resp.json();
    setTdata(data.response.body.items.item[0]);
  };

  // select 선택하면 데이터 바꾸기
  const handleChange = () => {
    getFetchData(refSel.current.value);
  };

  useEffect(() => {
    getFetchData("201193");
  }, []);

  // 화면에 정보 보여주기
  useEffect(() => {
    if (!tdata) return;

    console.log(Object.keys(scode));

    // Object.keys()는 객제의 key들만 배열로 반환하는 메서드
    const itemKeys = Object.keys(scode);

    let tm = itemKeys.map((item) => (
      <div key={item} className="flex flex-col justify-center items-center">
        <div
          className="bg-indigo-600 text-white w-full
                                                    border-r border-white"
        >
          {scode[item]["name"]}
        </div>
        <div
          className="bg-indigo-600 text-white w-full
                                                    border-r border-white"
        >
          ({item})
        </div>
        <div
          className="py-2 font-bold text-md text-gray-800
                                                    border border-t-indigo-800 w-full"
        >
          {tdata[item]}
          {tdata[item] != "-" && scode[item]["unit"]}
        </div>
      </div>
    ));

    setTags(tm);
    // console.log(tdata) ;
  }, [tdata]);

  return (
    <div className="w-full h-full mt-10 flex flex-col justify-start items-center ">
      <div className="w-9/10 grid grid-cols-2 gap-4 ">
        <h1 className="text-2xl font-bold">측정소 선택</h1>
        <select
          id="sel1"
          onChange={handleChange}
          ref={refSel}
          className="bg-gray-50 border border-gray-300
                               text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 
                                block w-full p-2.5"
        >
          {ops}
        </select>
      </div>
      <div className="w-9/10 grid grid-cols-9 gap4 mt-10">
        {tags}
      </div>
    </div>
  );
}
