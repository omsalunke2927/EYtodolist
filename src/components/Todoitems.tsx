import React, { useState } from 'react';
import './css/Todoitems.css';
import tick from './Assets/tick.png';
import nontick from './Assets/non tick.png';
import cross from './Assets/cross.png';
import edit from './Assets/edit.png';

interface TodoItemProps {
  no: number;
  display: string;
  text: string;
  setTodos: React.Dispatch<React.SetStateAction<{ no: number; text: string; display: string; }[]>>;
}

const Todoitems: React.FC<TodoItemProps> = ({ no, display, text, setTodos }) => {
  const [editedText, setEditedText] = useState<string>(text);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deleteTodo = (todoNo: number) => {
    try {
      const updatedTodos = JSON.parse(localStorage.getItem("todos") || "[]")
        .filter((todo: { no: number; }) => todo.no !== todoNo);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggle = () => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.no === no) {
          return { ...todo, display: todo.display === "" ? "line-through" : "" };
        }
        return todo;
      });
    });
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.no === no) {
            return { ...todo, text: editedText };
          }
          return todo;
        });
      });
      setIsEditing(false);
    }
  };

  return (
    <div className='todoitems'>
      <div className={`todoitems-container ${display}`} onClick={toggle}>
        {display === "" ? <img className="icon" src={nontick} alt="" /> : <img className="icon" src={tick} alt="" />}
        {isEditing ? (
          <input
            className="todoitems-text-input"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="todoitems-text" style={{ textDecoration: display }}>{editedText}</div>
        )}
      </div>
      <img className='todoitems-cross-icon icon' onClick={() => deleteTodo(no)} src={cross} alt="" />
      <img className='todoitems-edit-icon icon' onClick={handleEdit} src={edit} alt="" />
    </div>
  );
};

export default Todoitems;