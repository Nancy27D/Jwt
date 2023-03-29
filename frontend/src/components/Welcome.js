import axios from 'axios'
import React, { useEffect, useState } from 'react'
axios.defaults.withCredentials = true
let firstRender = true

const Welcome = () => {
  const [user, setUser] = useState()


  const sendUserReq = async () => {
    const resdata = await axios.get('http://localhost:5000/user', {
      withCredentials: true
    })
      // .then((res) => {
      //     console.log(res.data, "res.data.user")
      //     alert(res.data.message)
      //     setUser(res.data)
      // })
      .catch((err) => { console.log(err) })
    const data = await resdata.data;
    return data
  }

  //Geting refresh Token
  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/refresh", { withCredentials: true }).catch((err) => console.log(err))
    const data = await res.data;
    return data
  }
  // first rnder sendUserReq(token) then refresh token req
  useEffect(() => {
    if (firstRender) {
      firstRender = false
      sendUserReq().then((data) => setUser(data.user))
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user))
    }, 1000 * 28);
    return () => clearInterval(interval) 
  }, [])
  // console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
  return (
    <div>
      {user && <h1>{user.name}</h1>}
    </div>
  )
}

export default Welcome