import  { useEffect, useState } from 'react'
import { Todo } from './types/Todo';
import useFetch from './useFetch';



function useTodo(searchVal: string) {
    const [state, call] = useFetch<Todo>();
    const [searchValue, setSearchValue] = useState(searchVal)

      useEffect(() => {
        if(searchValue) {
          call("https://jsonplaceholder.typicode.com/todos/"+ searchValue);
        }
      }, [call, searchValue]);

      return [state, setSearchValue, searchValue] as const;
}

export default useTodo
