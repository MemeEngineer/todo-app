import {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import './App.css';
import todosData from './data/todosData';

function App() {
  const [todos, setTodos] = useState([]);
useEffect(() => {
  const saveTodos = localStorage.getItem('todos')
  if(saveTodos){
    setTodos(JSON.parse(saveTodos))
  }
},[])

//add Todo
const addTodo = (e) => {
  
  const newTodo = {
    id: new Date(),
    text: e.target.value,
    completed: false
  }
  setTodos([...todos,  newTodo]);
  e.target.value = '';
  localStorage.setItem('todos',JSON.stringify([...todos, newTodo]))
}

//complete todo

const completeTodo= (id) => {
const todosCopy = [...todos];
const indexOfTodo = todosCopy.findIndex(item => item.id === id)
//todosCopy[2].completed = !todosCopy[2].completed
todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed;

setTodos([...todosCopy])
localStorage.setItem('todos', JSON.stringify([...todosCopy]))
}

//update todo

const editTodoText = (id,e) => {
  const todosCopy = [...todos];
  const indexOfTodo = todosCopy.findIndex(item => item.id === id)
  todosCopy[indexOfTodo].text = e.target.value
  setTodos([...todosCopy])
  e.target.value = '';
  localStorage.setItem('todos', JSON.stringify([...todosCopy]))
}

//delete todo

const deleteTodo = (id) => {
  const todosCopy = [...todos];
  const indexOfTodo = todosCopy.findIndex(item => item.id === id)
  todosCopy.splice(indexOfTodo,1)
  setTodos([...todosCopy])
  localStorage.setItem('todos',JSON.stringify([...todosCopy]))
}

  return (
    <div className="App">
      <h1>Todos APP</h1>
      <TodoList todos={todos} addTodo={addTodo} completeTodo={completeTodo} editTodoText={editTodoText}
      deleteTodo={deleteTodo}/>

    </div>
  );
}

export default App;
