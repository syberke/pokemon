import React from 'react';

function TodoList({ todos, onToggle, onDelete }) {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        margin: '10px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <span onClick={() => onToggle(todo.id)} style={{ cursor: 'pointer' }}>
                        {todo.text}
                    </span>
                    <button onClick={() => onDelete(todo.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
