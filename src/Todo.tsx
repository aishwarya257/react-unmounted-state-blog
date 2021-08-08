import "./styles.css";
import useTodo from "./useTodo";
import { ChangeEventHandler } from "react";


export default function Todo() {
  const [todo, setSearchValue, searchValue] = useTodo("");
  const onSearchValueChange: ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => setSearchValue(value);
  return (
    <>
      <h2>Todo List </h2>
      <input type="text" name="search todo" value={searchValue} onChange={(e) => onSearchValueChange(e)} />
      {todo.status === "pending" ? <p> Loading</p> : todo.status === "resolved" && <span>{todo.data.title}</span> }
    </>
  );
}
