import React, { useReducer, useState } from 'react'
const initialTodos = []
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos)
  const [text, setText] = useState('')

  const handleAdd = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_TODO', payload: trimmed })
    setText('')
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Todo List</h2>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter task"
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
              {todo.completed ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
              style={{ marginLeft: 8 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}