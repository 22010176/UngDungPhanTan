import { InvalidTokenAction, ValidateToken } from "@/api/authApi";
import { useEffect } from "react"


export default function withAuth(WrappedComponent) {
  return (props) => {
    useEffect(() => { ValidateToken().catch(InvalidTokenAction) }, [])

    return <WrappedComponent {...props} />
  }
}
