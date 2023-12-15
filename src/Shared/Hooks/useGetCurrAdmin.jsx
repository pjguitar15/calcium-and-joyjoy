import { useEffect, useState } from "react"

const useGetCurrAdmin = () => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  const fromLocalStorage = localStorage.getItem("adminInfo")
  useEffect(() => {
    const stringified = JSON.parse(fromLocalStorage)
    setToken(stringified.token)
    setUserInfo(stringified.user_info)
    setUserId(stringified.id)
  }, [])

  return { userInfo, token, userId }
}

export default useGetCurrAdmin
