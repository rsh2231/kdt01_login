import TailButton from "../ui/TailButton";

export default function TodoItem({ item, handleDelete, handleToggle }) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 h-15 m-3 p-3 border border-gray-300 rounded-lg flex justify-between items-center">
        <input type="checkbox"
                onChange={() => handleToggle(item.id)} 
                checked={item.completed === "O"}            />
        <span>{item.text}</span>
        <TailButton 
          caption="삭제" 
          color="blue" 
          onClick={() => handleDelete(item.id)} />
      </div>
    </div>
  );
}
