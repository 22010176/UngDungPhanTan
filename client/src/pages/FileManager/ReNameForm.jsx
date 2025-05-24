import { Input } from "antd";
import { useState } from "react";

function ReNameForm() {
  const [editName, setEditName] = useState('');
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2">Name</label>
      <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter name" />
    </div>
  )
}

export default ReNameForm