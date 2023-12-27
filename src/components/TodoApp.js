import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList'; // Import the Child component

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('#fff');
  const [todos, setTodos] = useState([]);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);

  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        text: inputValue,
        color: selectedColor,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const markComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <div className="container" style={{ backgroundColor: selectedColor }}>
    <div className="todo-form">
      <h1>TODO List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo..."
      />
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        markComplete={markComplete}
        onDragEnd={onDragEnd}
      />
    </div>
    </div>
  );
};

export default TodoApp;
