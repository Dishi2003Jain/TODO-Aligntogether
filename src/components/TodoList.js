import React from 'react';

const TodoList = ({ todos, deleteTodo, editTodo, markComplete }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <span>
            {todo.text}
          </span>
          <div className="buttons">
          <button onClick={() => editTodo(todo.id, prompt('Edit task:', todo.text))}>
            Edit
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => markComplete(todo.id)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
