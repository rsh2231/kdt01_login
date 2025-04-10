import { useState} from "react";
import TailButton from "../ui/TailButton";

export default function TodoForm({ handleClick, handleReset, refText}) {
  const [selected, setSelected] = useState("X") ; // 선택 상태 관리

  return (
    <div className="flex flex-col justify-center items-centermt-10 w-full h-40 bg-amber-50 shadow-lg mt-10 mb-10">
      <h1 className=" flex justify-center text-4xl font-bold">Todo List</h1>
      <div className="gird gap-4 justify-evenly items-center">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)} // 상태 업데이트 
          className="bg-white border border-gray-300 rounded-lg w-20 h-10 mr-2 text-center">
          <option value="X">x</option>
          <option value="O">o</option>
        </select>
        <input
          ref={refText} // 부모 ref 사용
          className="bg-white border border-gray-300 text-center rounded-lg  w-100 h-10"
          type="text"
        />
        <TailButton 
          caption="확인" 
          color="blue" 
          onClick={() => handleClick(selected)} />
        <TailButton 
          caption="취소" 
          color="orange" 
          onClick={handleReset} />
      </div>
    </div>
  );
}
