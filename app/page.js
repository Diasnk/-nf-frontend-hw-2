'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const task = {id: 1, text: "Todo Test", completed: false}

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Store tasks in localStorage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if(newTaskText.trim() === '') console.log(newTaskText);
    const newTask = {id: Date.now(), text: newTaskText, completed: false}
    setTasks([...tasks, newTask])
    setNewTaskText('')
    };

    const handleToggleTask = (taskId) => {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    };
  
    const handleDeleteTask = (taskId) => {
      setTasks(tasks.filter(task => task.id !== taskId));
    };
  
    const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
    });
  
    const uncompletedTasksCount = tasks.filter(task => !task.completed).length;
  
  return (
    <div className="mx-auto p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Todo-list</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4 shadow-lg">
        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <p>{uncompletedTasksCount} items left</p>
          <div>
            <button 
              onClick={() => setFilter('all')} 
              className={`mr-2 ${filter === 'all' ? 'text-white' : 'text-gray-400'} hover:text-white focus:outline-none`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`mr-2 ${filter === 'active' ? 'text-white' : 'text-gray-400'} hover:text-white focus:outline-none`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`${filter === 'completed' ? 'text-white' : 'text-gray-400'} hover:text-white focus:outline-none`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => setTasks(tasks.filter(task => !task.completed))}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
