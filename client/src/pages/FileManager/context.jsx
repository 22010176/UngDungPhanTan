import { createContext } from "react";

export const Context = createContext()

export const initialValues = {
  files: [],
  selectedFile: null
}

export function reducer(state, action) {
  const _state = { ...state }
  const { type, payload } = action
  console.log({ type, payload })

  switch (type) {
    case "updateFileList":
      _state.files = payload
      _state.selectedFile = null
      break
    case "updateSelectedFile":
      _state.selectedFile = payload
      break
    default:
      break
  }

  return _state
}

