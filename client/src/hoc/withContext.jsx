import { useReducer } from "react"

function withContext(WrappedComponent, Context, initialValues, reducer) {
  return props => {
    const [state, dispatch] = useReducer(reducer, initialValues)

    return (
      <Context.Provider value={[state, dispatch]}>
        <WrappedComponent {...props} />
      </Context.Provider>
    )
  }
}

export default withContext