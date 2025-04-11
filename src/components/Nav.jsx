import { IoHome } from "react-icons/io5";
import { IoIosSubway } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { VscChecklist } from "react-icons/vsc";
import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { isLogin } from "../atoms/IsLoginAtom";

export default function Nav() {
  const [login, setLogin] = useAtom(isLogin);

  const handleClick = () => {
    setLogin(false);
    localStorage.setItem("email", "");
  };

  return (
    <header className="w-full h-24 bg-pink-100 shadow-lg px-10 flex justify-between items-center">
      <div className={`text-5xl text-blue-600 ${login ? 'animate-spin [animation-duration:_2s]' : ''}`}>
        <FaReact />
      </div>

      <ul className='flex justify-center items-center text-blue-900'>
        <li className='mx-1 p-2 rounded-sm text-4xl hover:bg-lime-50 hover:text-lime-700'>
          <Link to="/"><IoHome /></Link>
        </li>
        {login &&
          <li className='mx-1 p-2 rounded-sm text-4xl hover:bg-lime-50 hover:text-lime-700'>
            <Link to="/subway"><IoIosSubway /></Link>
          </li>
        }
        {login &&
          <li className='mx-1 p-2 rounded-sm text-4xl hover:bg-lime-50 hover:text-lime-700'>
            <Link to="/todolist"><VscChecklist /></Link>
          </li>
        }
      </ul>
      <div className='p-2  text-blue-900 text-2xl
                         border rounded-sm
                                      hover:cursor-pointer hover:bg-emerald-400'>
        {login ? <span onClick={handleClick}><IoIosLogOut /></span>
          : <span><IoIosLogIn /></span>
        }
      </div>
    </header>
  );
}
