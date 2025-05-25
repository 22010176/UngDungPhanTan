import { Input } from "antd";
import { useContext } from "react";

import { Context } from "./context";

function ReNameForm() {
  const [state, dispatch] = useContext(Context)

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2">Name</label>
      <Input
        placeholder="Enter name"
        value={state.fileName}
        onChange={(e) => dispatch({ type: "updateFileForm", payload: e.target.value })} />
    </div>
  )
}

export default ReNameForm