import { useState } from "react";
import TailButton from "../ui/TailButton";

export default function TodoForm({refText, handleClick, handleReset}) {
  const [selected, setSelected] = useState();

  return (
    <div>
      <div className="mt-10 flex flex-col justify-center items-center w-full h-50 bg-amber-100 shadow-lg">
        <h1 className="font-bold text-3xl">Todo List</h1>
        <div className="gird grid-cols-4">
          <select className="w-20 h-10 mr-2 border border-gray-300 rounded-lg bg-white text-center"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}>    
            <option>X</option>
            <option>O</option>
          </select>
          <input
            ref={refText}
            type="text"
            className="w-100 h-10 border border-gray-300 rounded-lg bg-white text-center"
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleClick(selected) ;
              }
            }}
          />
          <TailButton 
            caption="확인" 
            color="blue" 
            onClick={() => handleClick(selected)} />
          <TailButton 
            caption="취소" 
            color="orange" 
            onClick={() => handleReset()} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
