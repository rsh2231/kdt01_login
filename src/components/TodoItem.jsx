import TailButton from "../ui/TailButton";

export default function TodoItem({ item, handleDelete, handleToggle }) {

  return (
    <div className="w-full p-5 flex justify-between items-center h-15 border rounded-lg border-gray-300 mb-5">
        <input 
        type="checkbox" 
        checked={item.completed === "O"}
        onChange={() => handleToggle(item.id)}
        />
        <span className={item.completed === "O" ? "line-through text-gray-400" : ""}>
        {item.text}
        </span>
        <TailButton 
          caption="삭제" 
          color="blue" 
          onClick={() => handleDelete(item.id)} />
    </div>
  );
}
