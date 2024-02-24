import React, { useEffect, useRef, useState } from 'react';
import './css/Todo.css';
import Todoitems from './Todoitems';

interface TodoItem {
  no: number;
  text: string;
  display: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (inputRef.current?.value) {
      const count = todos.length; // calculate count based on current length of todos
      setTodos([...todos, { no: count, text: inputRef.current.value, display: "" }]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className='todo'>
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type='text' placeholder='Add Your Task' className='todo-input' />
        <div onClick={add} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => (
          <Todoitems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
        ))}
      </div>
    </div>
  );
};

export default Todo;