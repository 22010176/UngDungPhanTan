export default function composeHoc(base, ...hoc) {
  return hoc.reduce((acc, fn) => fn(acc), base)
}

