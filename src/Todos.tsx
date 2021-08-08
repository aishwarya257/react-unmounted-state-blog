import useTodos from './useTodos'

function TodoList() {

    const [state] = useTodos()
    return (
        <>
        <h1> Top Todos </h1>
        {state.status === "pending" ? (
            <p> Loading...</p>
          ) : (
            <ul className="TodoList">
              {state.data?.slice(0, 10).map((todo) => (
                <li key={todo.id} className="TodoItem">
                  <span> {todo.title} </span>{" "}
                </li>
              ))}
            </ul>
          )}
          </>
    )
}

export default TodoList
