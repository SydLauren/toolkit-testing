import { todosSelector } from '@/store';
import { todoAdded } from '@/features/todos/todosSlice';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Flex from '../ui/Flex';
import { Button } from '../ui/button';

export const Todos = () => {
  const allTodos = useAppSelector(todosSelector.selectAll);
  const dispatch = useAppDispatch();
  const todoId = useRef('1');
  const [todoTitle, setTodoTitle] = useState<string>('');

  return (
    <div>
      <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />
      <Button
        onClick={() => {
          dispatch(todoAdded({ id: todoId.current, title: todoTitle }));
          todoId.current = (parseInt(todoId.current) + 1).toString();
        }}
      />
      <Flex direction={'column'}>
        {allTodos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </Flex>
    </div>
  );
};
