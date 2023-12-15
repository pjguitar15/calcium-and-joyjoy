import { useEffect, useState } from "react"

const useGetCurrAdmin = () => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("adminInfo")
    const stringified = JSON.parse(fromLocalStorage)
    setToken(stringified.token)
    setUserInfo(stringified.user_info)
    setUserId(stringified.id)
  }, [])

  return { userInfo, token, userId }
}

export default useGetCurrAdmin
