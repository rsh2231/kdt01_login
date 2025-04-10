import TailButton from "../ui/TailButton";

export default function TodoForm({refSel}) {
  return (
    <div>
      <div className="mt-10 flex flex-col justify-center items-center w-full h-50 bg-amber-100 shadow-lg">
        <h1 className="font-bold text-3xl">Todo List</h1>
        <div className="gird grid-cols-4">
          <select className="w-20 h-10 mr-2 border border-gray-300 rounded-lg bg-white text-center">
            <option>X</option>
            <option>O</option>
          </select>
          <input
            ref={refSel}
            type="text"
            className="w-100 h-10 border border-gray-300 rounded-lg bg-white text-center"
          />
          <TailButton caption="확인" color="blue" onClick={() => {}} />
          <TailButton caption="취소" color="orange" onClick={() => {}} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
