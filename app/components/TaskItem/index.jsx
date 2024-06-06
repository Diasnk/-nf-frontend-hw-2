import Image from 'next/image';
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="flex justify-between items-center p-2 bg-gray-600 rounded mb-2">
      <div className="flex items-center">
        <button 
          className="w-6 h-6 my-auto mr-6 focus:outline-none"
          onClick={() => onToggleTask(task.id)} 
        >
          {
            task.completed 
            ?
              <FaRegCheckCircle 
              className='text-gray-500 hover:text-white'
              width={30}
              height={30}
              />
            :
              <FaRegCircle 
              className='text-gray-500 hover:text-white'
              width={30}
              height={30}
              />
          } 
        </button>
        <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.text}</span>
      </div>
      <button onClick={() => onDeleteTask(task.id)} className="text-gray-400 hover:text-white focus:outline-none">
        <MdDelete />
      </button>
    </li>
  );
}