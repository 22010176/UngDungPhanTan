import { ValidateToken } from "@/api/authApi"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function withNoAuth(WrappedComponent) {
  return (props) => {
    const navigate = useNavigate()

    useEffect(() => {
      ValidateToken().then(() => navigate("/file-manager"))
    }, [])

    return <WrappedComponent {...props} />
  }
}


