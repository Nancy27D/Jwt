import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
})
const dispatch=useDispatch()
const navigate = useNavigate()

const handleChange = (e) => {
    setInputs(prev => ({
        ...prev, [e.target.name]: e.target.value
    }))
    // console.log(e.target.name, e.target.value, "N V")
}
let data = {
    email: inputs.email,
    password: inputs.password,
}
const sendReqLogin = async () => {
    const resData = await axios.post('http://localhost:5000/login', data).then((res) => {
        console.log(res.data, "res.data")
        alert(res.data.message)
        if (res.data.message && res.data.user) {
            navigate('/user')
        }
    }).catch((err) => console.log(err))
    return resData;
}
const handleSubmit = (e) => {
    e.preventDefault()
    sendReqLogin().then(()=>dispatch(authActions.login()))
}

return (
    <div>
        <from onSubmit={handleSubmit}>

            <Box display="flex" flexDirection={'column'} width={300} marginLeft='auto' marginRight='auto' justifyContent='center' alignItems='center'>
                <Typography variant='h2'> LOGIN</Typography>
                <TextField margin='normal' variant='outlined' type="email" placeholder='Email' value={inputs.email} onChange={handleChange} name="email" />
                <TextField margin='normal' variant='outlined' type="password" placeholder='Password' value={inputs.password} onChange={handleChange} name="password" />

                <Button type='submit' variant='contained' onClick={sendReqLogin}  > Login</Button>
            </Box>
        </from>

    </div>
  )
}

export default Login