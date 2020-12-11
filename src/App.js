import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [data, getData] = useState([]);
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(r => {
      console.log(r);
      // getData(r.data);
      setTimeout(() => {
        getData(r.data);
      }, 3000);
    });
  }, []);

  const setText = e => {
    setInput(e.target.value);
  };

  const setTodos = () => {
    console.log('todo 입력');
  };

  return (
    <div className="app">
      <h1>Electron React App</h1>
      <div>
        내용 수정을 위해서 리액트 내용을 수정하고 일렉트론 브라우저 새로고침을 하면 된다.
        <br />
        F5 or Ctrl + r을 누른다.
      </div>
      <hr />
      <h2>로컬에 저장되는 Todos</h2>
      <p>
        <input onChange={setText} />
        <button type="button" onClick={setTodos}>
          입력
        </button>
      </p>
      {todos.length === 0 && <p>현재 할일이 없습니다.</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
      <hr />
      <h2>https://jsonplaceholder.typicode.com/todos</h2>
      <p>(3초 로딩 시간을 줌)</p>
      {data.length === 0 && <p>Loading...</p>}
      {data.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default App;
