import  { useEffect } from 'react'
import { Todo } from './types/Todo';
import useCancellableFetch from './useCancellableFetch';



function useTodos() {
    const [state, call] = useCancellableFetch<Todo[]>();
    useEffect(() => {
        call("https://jsonplaceholder.typicode.com/todos/");
    }, [call]);
      return [state] as const;
}

export default useTodos
