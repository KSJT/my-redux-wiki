import React, { useState } from "react";
import styles from "./Todo.module.scss";

interface TodoItem {
  id: string;
  title: string;
  done: boolean;
}
const defaultTodo: TodoItem[] = [
  { id: "1", title: "할 일을 추가해 보세요.", done: false },
];
const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")!)
      : defaultTodo
  );
  const [value, setValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<TodoItem>(Object);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    const newTodo = {
      id: crypto.randomUUID().toString(),
      title: value,
      done: false,
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setValue("");
  };

  const handleDelete = (id: string) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
    localStorage.setItem("todos", JSON.stringify(newArray));
  };

  const handleDone = (todo: TodoItem) => {
    const newArray = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodos(newArray);
    localStorage.setItem("todos", JSON.stringify(newArray));
  };

  const handleEdit = (todo: TodoItem) => {
    setValue(todo.title);
    setIsEditing(!isEditing);
    setNewTodo(todo);
  };

  const editTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    const newArray = todos.map((item) => {
      if (item.id === newTodo.id) {
        return { ...item, title: value };
      }
      return item;
    });
    setTodos(newArray);
    localStorage.setItem("todos", JSON.stringify(newArray));
    setValue("");
    setIsEditing(!isEditing);
  };

  const deleteAll = () => {
    event?.preventDefault();
    const result = confirm("모두 삭제할까요?");

    if (result) {
      setTodos([]);
      localStorage.removeItem("todos");
    } else return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.todo_title}>
        <span className="material-symbols-outlined">task</span>
        <div className={styles.todos}>Todos</div>
      </div>
      <form>
        <div className={styles.input_box}>
          {/* input */}
          <input value={value} onChange={handleChange} type="text" />
          {/* submit btn */}
          {!isEditing ? (
            <button
              onClick={(event) => handleSubmit(event)}
              className={styles.add_btn}
            >
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          ) : (
            <button
              className={styles.edit_check}
              onClick={(event) => editTodo(event)}
            >
              <span className="material-symbols-outlined">check_circle</span>
            </button>
          )}
          <button onClick={() => deleteAll()} className={styles.clear}>
            <span className="material-symbols-outlined">delete_sweep</span>
          </button>
        </div>
      </form>

      {/* todo container */}
      <div className={styles.todos_container}>
        {todos.map((todo) => (
          <div className={styles.todo_item_container} key={todo.id}>
            <li
              onClick={() => handleDone(todo)}
              className={!todo.done ? styles.todo_item : styles.todo_done}
            >
              {todo.title}
            </li>

            <div className={styles.todo_icons}>
              <button onClick={() => handleEdit(todo)}>
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button onClick={() => handleDelete(todo.id)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
