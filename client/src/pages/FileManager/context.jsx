import { createContext } from "react";

export const Context = createContext()

export const initialValues = {
  files: [],
  selectedFile: null,
  openForm: "", // newFolder | newFile
  fileName: ""
}

export function reducer(state, action) {
  const _state = { ...state }
  const { type, payload } = action

  switch (type) {
    case "updateFileList":
      _state.files = payload
      _state.selectedFile = null
      break
    case "updateSelectedFile":
      _state.selectedFile = payload
      break
    case "updateForm":
      _state.openForm = action.payload
      break
    case "updateFileForm":
      _state.fileName = payload
      break

    default:
      break
  }

  return _state
}

