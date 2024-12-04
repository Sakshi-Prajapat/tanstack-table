import React from 'react';
import logo from './logo.svg';
import './App.css';
import Exapmle from './exapmle';
import UserForm from './components/UserForm';
import { TodoForm } from './components/TodoForm';
import TodoTable from './components/TodoTable';

function App() {
  
  return (
    <div >
      {/* <Exapmle name= "nnksd"/> */}
      {/* <UserForm/> */}
      <TodoForm/>
      <TodoTable/>
    </div>
  );
}

export default App;
