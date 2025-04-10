import { useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useState, useRef } from "react";

const baseurl = "http://localhost:3005/todos";
export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const refText = useRef(); //input 참조용 ref

  // 전체 데이터 불러오기
  const getData = async () => {
    const resp = await axios.get(baseurl);
    console.log(resp.data);
    setTodos(resp.data);
  };

  // 자료 추가
  const addTodo = async (text, completed) => {
    const resp = await axios.post(baseurl, {
      text: text,
      completed: completed,
    });
  };

  // 삭제
  const handleDelete = async (id) => {
    await axios.delete(baseurl + `/${id}`);
  };

  // 수정(토글)
  const handleToggle = async (id) => {
    const resp = await axios.get(baseurl + `/${id}`);
    const todo = resp.data;

    const done = todo.completed == "O" ? "X" : "O";
    await axios.patch(baseurl + `/${id}`, {
      completed: done,
    });
  };

  const handleClick = (selected) => {
    const text = refText.current.value; // input에서 값 가져오기
    if (text.trim() === "") return;
    addTodo(text, selected);  // 선택된 상태도 같이 전달
    refText.current.value = ""; // 입력창 비우기
  };

  const handleReset = () => {
    refText.current.value = ""; // 입력 초기화
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <TodoForm
        refText={refText} // 프롭스 전달
        handleClick={handleClick}
        handleReset={handleReset}
      />
      {todos && todos.map((item) => (
        <TodoItem 
          key={item.id} 
          item={item}
          handleDelete={handleDelete}
          handleToggle={handleToggle} />
          
      ))}
    </div>
  );
}
