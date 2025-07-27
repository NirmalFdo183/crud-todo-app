import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const gettodos = async () => {
      const response = await fetch(`http://localhost:5000/api/todos`, {
        method: "GET",
      });
      const todos = await response.json();
      setTodos(todos);
    };

    gettodos();
  }, []);


  const deleteTodo = async (todoId) => {
    const response = await fetch(
      `http://localhost:5000/api/todos/${todoId}`,
      {
        method : "DELETE",
      }
    );
    if(!response.ok) return;

    setTodos((prev) => prev.filter((todo)=> todo._id !== todoId));
  };

  const createNewTodo = async (e) => {
    e.preventDefault(); //prevent page refresh on submiting form

    const res = await fetch(`http://localhost:5000/api/todos`, {
      method: "POST",
      body: JSON.stringify({ task: content }),
      headers: { "Content-type": "application/json" },
    });

    const newTodo = await res.json();

    setContent("");
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Task manager</h1>
      <div>
      <form className="todo-form" onSubmit={createNewTodo}>
          <div className="add">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a new todo..."
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="todo-button">
              Add Todo
            </button>
          </div>
        </form>

        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="todos">
              <p>{todo.task}</p>
              <p>{todo.status ? "completed" : "pending"}</p>
              <button  onClick={()=> deleteTodo(todo._id)} className="todo-button todo-delete-button">
              Delete Todo
            </button>
            </div>
          ))
        ) : (
          <div>
            <p>No todos found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
