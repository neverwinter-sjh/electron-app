import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import axios from 'axios';
import _ from 'lodash';

const App = () => {
  const [data, getData] = useState([]);
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    let tds = localStorage.getItem('TODOS');
    if (tds !== null) tds = JSON.parse(tds);
    else tds = [];
    setTodo(tds);
    axios.get('https://jsonplaceholder.typicode.com/todos').then(r => {      
      // getData(r.data);
      setTimeout(() => {
        getData(r.data);
      }, 1000);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('TODOS', JSON.stringify(todos));
  }, [todos]);

  const setText = e => {
    let txt = e.target.value;
    txt = txt.trim();
    setInput(txt);
  };

  const setTodos = () => {
    const sameTxt = _.find(todos, todo => {
      if ( todo.text === input) return todo;
    });

    if (sameTxt) {
      alert('이미 등록된 할일입니다.');
      setInput('');
      return false;
    }

    if (input !== '') {      
      setTodo(todos.concat({
        text: input
      }));
    } else {
      alert('할일을 입력해 주세요.');
    }
  };

  const delTodo = todo => {
    const tds = _.filter(todos, item => item.text !== todo.text);
    setTodo(tds);
  }

  return (
    <div className="app">
      <h1>Electron React App</h1>
      <div>
        1) API에서 불러오기<br />
        2) 로컬에 저장하기
        <br /><br />
        새로고침: F5 or Ctrl + r을 누른다.
      </div>
      <hr />
      <h2>로컬에 저장되는 Todos</h2>
      <p>
        <input onChange={setText} value={input} />
        <button type="button" onClick={setTodos}>
          입력
        </button>
      </p>
      {todos.length === 0 && <p>현재 할일이 없습니다.</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button type="button" onClick={() => delTodo(todo)}>X</button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>https://jsonplaceholder.typicode.com/todos 에서 불러옴</h2>      
      {data.length === 0 && <p>Loading...</p>}
      {data.map((item, index) => (
        <div key={item.id}>{index+1}) {item.title}</div>
      ))}
    </div>
  );
};

export default App;
