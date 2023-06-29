import { useSelector, TypedUseSelectorHook } from 'react-redux'

//  ------------- New --------------

import { configureStore, createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer café', 'Estudar Redux', 'Estudar Zustand'],

  reducers: {
    add: (state, action) => {
      state.push(action.payload.newTodo)
    },
  },
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export const { add } = todoSlice.actions

//  ----------- Legacy ----------------

// import { legacy_createStore as createStore } from 'redux'

// function counterReducer(
//   state = { todo: ['Fazer café', 'Estudar Redux', 'Estudar Zustand'] },
//   action: any,
// ) {
//   switch (action.type) {
//     case 'todo/add':
//       return {
//         todo: [...state.todo, action.payload.newTodo],
//       }
//     default:
//       return state
//   }
// }

// export const store = createStore(counterReducer)

// export function add(payload: any) {
//   return { type: 'todo/add', payload }
// }

//  ---------------------------

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
