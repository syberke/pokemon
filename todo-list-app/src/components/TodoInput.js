import React, { useState } from 'react';

function TodoInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Masukkan tugas..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: '8px', width: '80%' }}
            />
            <button type="submit" style={{ padding: '8px' }}>Tambah</button>
        </form>
    );
}

export default TodoInput;
