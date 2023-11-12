import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todoList.find((i) => i.id === editId);
      const updatedTodos = todoList.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodoList(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodoList([{ id: `${todo} - ${Date.now()}`, todo }, ...todoList]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todoList.filter((to) => to.id !== id);
    setTodoList([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todoList.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  return (
    <div className="flex justify-center bg-neutral-800 ">
      <div className="flex flex-col items-center  border  m-6 h-[537px]  w-96 p-6 ">
        <h1 className="text-white font-bold text-2xl p-2"> Todo List </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            className="w-60 m-3 border pl-2  rounded-lg"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="border text-base px-2 bg-green-300 rounded-lg">
            {editId ? "Edit" : "Add"}
          </button>
        </form>

        <ul className="">
          {todoList.map((t) => (
            <li className="text-white my-3 py-1 px-5 flex w-80 items-center bg-cyan-900 ">
              <span className="text-lg flex-1" key={t.id}>
                {t.todo}
              </span>
              <button
                onClick={() => handleEdit(t.id)}
                className="border px-1 m-1 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="border px-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
