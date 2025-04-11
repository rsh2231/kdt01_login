import { useEffect, useRef, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import axios from "axios";

const baseurl = "http://localhost:3005/todos";

export default function TodoList() {
  // 초기 데이터
  const [tdata, setTdata] = useState([]);

  // ref
  const refText = useRef();

  // 전체 데이터 불러오기
  const getData = async () => {
    const resp = await axios.get(baseurl);
    console.log(resp.data);
    setTdata(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // 수정(토글)
  const handleToggle = async (id) => {
    const resp = await axios.get(baseurl + `/${id}`);
    const todo = resp.data;

    const done = todo.completed === "O" ? "X": "O";
    await axios.patch(baseurl + `/${id}`, { completed: done });
    getData();
  };

  // 추가
  const addTodo = async (text, completed) => {
    const resp = await axios.post(baseurl, { text, completed });
    getData();
  };

  // 삭제
  const handleDelete = async (id) => {
    await axios.delete(baseurl + `/${id}`);
    getData();
  };

  // 확인 버튼을 누르면 추가
  const handleClick = (selected) => {
    const text = refText.current.value;
    if (text.trim() === "") {
      alert("값을 입력하세요.");
      refText.current.focus();
      return;
    }

    addTodo(text, selected);
    refText.current.value = "";
  };

  // 취소 버튼을 누르면 리셋
  const handleReset = () => {
    refText.current.value = "";
  };
  return (
    <div className="w-full h-full">
      <div>
        <TodoForm
          refText={refText}
          handleClick={handleClick}
          handleReset={handleReset}
        />
      </div>
      <div>
        {tdata.map((item) => (
          <TodoItem key={item.id} 
                    item={item} 
                    handleDelete={handleDelete} 
                    handleToggle={handleToggle}
                    />
        ))}
      </div>
    </div>
  );
}
