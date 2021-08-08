import  { useEffect } from 'react'
import { Todo } from './types/Todo';
import useFetch from './useFetch';



function useTodos() {
    const [state, call] = useFetch<Todo[]>();
    useEffect(() => {
        call("https://jsonplaceholder.typicode.com/todos/");
    }, [call]);
      return [state] as const;
}

export default useTodos
