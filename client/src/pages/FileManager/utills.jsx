import { GetFileList } from "@/api/storageApi"

export function UpdateFileList(dispatch, path) {
  GetFileList(path)
    .then(files => {
      const paths = files.filter(i => i.key.split('/').filter(i => i).length > 1)
      if (path.length > 0) paths.unshift({ key: "../" })

      dispatch({ type: "updateFileList", payload: paths })
    })
}

