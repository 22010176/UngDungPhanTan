import { createContext } from "react";

export const Context = createContext()

export const initialValues = {}

export function reducer(state, action) {
  const _state = { ...state }
  const { type, payload } = action
  console.log({ type, payload })

  return _state
}

