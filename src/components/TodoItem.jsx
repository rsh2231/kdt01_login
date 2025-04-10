import TailButton from "../ui/TailButton";

export default function TodoItem({ item, handleDelete, handleToggle }) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 h-15 m-3 p-3 border border-gray-300 rounded-lg flex justify-between items-center">
        <input type="checkbox"
                checked={item.completed === "O"}
                onChange={() => handleToggle(item.id)}         
                />
        <span className={item.completed === "O" ? "line-through text-red-600" : ""}>
        {item.text}
        </span>
        <TailButton 
          caption="삭제" 
          color="blue" 
          onClick={() => handleDelete(item.id)} />
      </div>
    </div>
  );
}
