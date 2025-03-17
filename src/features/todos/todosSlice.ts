import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
}

export const todosAdapter = createEntityAdapter({
  selectId: (todo: Todo) => todo.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoDeleted: todosAdapter.removeOne,
    todoUpdated: (state, action: PayloadAction<Todo>) => {
      todosAdapter.setOne(state, action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { todoAdded, todoDeleted, todoUpdated } = todosSlice.actions;

export default todosSlice.reducer;
