import { createContext } from "react";

export const Context = createContext()

export const initialValues = {
  files: [],
  selectedFile: null,
  openForm: "", // newFolder | editFile
  fileName: "",
  oldFileName: ""
}

export function reducer(state, action) {
  const _state = { ...state }

  const actions = Array.isArray(action) ? action : [action]
  for (const a of actions) {
    const { type, payload } = a

    switch (type) {
      case "updateFileList":
        _state.files = payload
        _state.selectedFile = null
        break
      case "updateSelectedFile":
        _state.selectedFile = payload
        break
      case "updateForm":
        _state.openForm = payload
        break
      case "updateFileForm":
        _state.fileName = payload
        break
      case "updateFileEdit":
        _state.oldFileName = payload
        break;
    }
  }

  return _state
}

