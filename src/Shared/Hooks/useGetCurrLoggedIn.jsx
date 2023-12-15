import { useEffect, useState } from "react"

const useGetCurrLoggedIn = () => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("user")
    const stringified = JSON.parse(fromLocalStorage)
    setToken(stringified.token)
    setUserInfo(stringified.user_info)
    setUserId(stringified.user_info.id)
  }, [])

  return { userInfo, token, userId }
}

export default useGetCurrLoggedIn
