import TailButton from "../ui/TailButton";

export default function TodoItem({ item, handleDelete, handleToggle }) {
  const {id, text, completed} = item ;
  return (
    <div className="w-1/2 p-5 flex justify-between items-center h-15 border rounded-lg border-gray-300 mb-5">
        <input 
        type="checkbox" 
        checked={completed === "O"}
        onChange={() => handleToggle(id)}
        />
        <span className={completed === "O" ? "line-through text-gray-400" : ""}>
        {text}
        </span>
        <TailButton 
          caption="삭제" 
          color="blue" 
          onClick={() => handleDelete(id)} />
    </div>
  );
}
