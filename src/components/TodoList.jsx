import { useEffect, useRef, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import axios from "axios";

const baseurl = "http://localhost:3005/todos";

export default function TodoList() {
  // 초기 데이터
  const [tdata, setTdata] = useState([]);

  // ref
  const refSel = useRef();

  // 전체 데이터 불러오기
  const getData = async () => {
    const resp = await axios.get(baseurl);
    console.log(resp.data);
    setTdata(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <TodoForm refSel={refSel} />
      </div>
      <div>
        {tdata.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
