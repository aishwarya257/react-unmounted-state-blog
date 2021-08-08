import "./styles.css";
import Todo from "./Todo";
import {Switch, Route, Link} from "react-router-dom";
import TodoList from "./Todos";


export default function App() {
  return (
    <div className="App">
      <header>
        <ul className="navList">
          <Link to="/">
              <li className="navItem">Home</li>
          </Link>
          <Link to="/search">
            <li className="navItem">Search</li>
          </Link>
        </ul>
      </header>
    <Switch>
      <Route path="/search">
        <Todo />
      </Route>
      <Route path="/">
        <TodoList />
      </Route>
    </Switch>
    </div>
  );
}
