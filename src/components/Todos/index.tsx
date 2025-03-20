import { todosSelector } from '@/store';
import { todoAdded, todoDeleted } from '@/features/todos/todosSlice';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Flex from '@ui/Flex';
import { Button } from '@ui/button';
import { Input } from '@ui/input';

export const Todos = () => {
  const allTodos = useAppSelector(todosSelector.selectAll);
  const dispatch = useAppDispatch();
  const todoId = useRef('1');
  const [todoTitle, setTodoTitle] = useState<string>('');

  const addTodo = (title: string) => {
    const timeCreated = Date.now();
    dispatch(
      todoAdded({ id: todoId.current, title, dateCreated: timeCreated }),
    );
    todoId.current = (parseInt(todoId.current) + 1).toString();
    setTodoTitle('');
  };

  return (
    <div>
      <Flex gap={2} className="mb-4">
        <Input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === 'Enter') {
              addTodo(todoTitle);
            }
          }}
        />
        <Button
          onClick={() => {
            addTodo(todoTitle);
          }}
        >
          Enter
        </Button>
      </Flex>
      <Flex direction={'column'} gap={1} className="p-2">
        {allTodos.map((todo) => (
          <Flex
            className="group rounded bg-gray-300 px-2 py-1"
            key={todo.id}
            gap={2}
            align={'center'}
          >
            {todo.title}
            <Button
              className="hidden group-hover:block"
              size={'content'}
              variant="ghost"
              onClick={() => {
                dispatch(todoDeleted(todo.id));
              }}
            >
              X
            </Button>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};
