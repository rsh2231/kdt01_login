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
    await axios.post(baseurl, { text, completed });
    getData();
  };

  // 삭제
  const handleDelete = async (id) => {
    await axios.delete(baseurl + `/${id}`);
    getData();
  };

  // 수정(토글)
  const handleToggle = async (id) => {
    const resp = await axios.get(baseurl + `/${id}`);
    const todo = resp.data;

    const done = todo.completed == "O" ? "X" : "O";
    await axios.patch(baseurl + `/${id}`, {
      completed: done,
    });
    getData();
  };

  const handleClick = (selected) => {
    const text = refText.current.value; // input에서 값 가져오기
    if (text.trim() === "") {
      alert("값을 입력하세요.");
      refText.current.focus();
      return;
    }

    addTodo(text, selected); // 선택된 상태도 같이 전달
    refText.current.value = ""; // 입력창 비우기
  };

  const handleReset = () => {
    refText.current.value = ""; // 입력 초기화
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div>
        <TodoForm
          refText={refText} // 프롭스 전달
          handleClick={handleClick}
          handleReset={handleReset}
        />
      </div>
      <div className="w-full flex justify-center i">
        <div className="flex w-1/2 flex-col">
          {todos &&
            todos.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            ))}
        </div>
        <div>
        <img src="/public/study.jpg" className="w-150 h-150" />
        </div>
      </div>
    </div>
  );
}
