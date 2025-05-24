export function GetFileName(path) {
  let dir = IsDir(path)
  const name = path.split('/').filter(i => i)
  const fileName = name[name.length - 1]

  return fileName + (dir ? '/' : '')
}


export function IsDir(path) {
  return path[path.length - 1] === '/'
}

export function FormatFileSize(size) {
  const _size = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  for (let i = 0; i < _size.length; i++) {
    if (size < Math.pow(1024, i + 1))
      return Math.round(size / Math.pow(1024, i)) + " " + _size[i]
  }
}
export function FormatModifiedDate(date) {
  return new Date(date).toLocaleString()
}