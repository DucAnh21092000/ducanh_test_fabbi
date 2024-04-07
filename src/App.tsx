import './App.css';
import CreateTodo from './pages/todo/create-todo/CreateTodo';
import { CreateTodoProvie } from './pages/todo/create-todo/context/CreateToDoContext';

function App() {
  return (
    <CreateTodoProvie>
      <CreateTodo />
    </CreateTodoProvie>
  );
}

export default App;
