import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
        // console.log(e.target.name, e.target.value, "N V")
    }
    let data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
    }
    const sendReqSignUp = async () => {
        const resData = await axios.post('http://localhost:5000/signup', data).then((res) => {
            console.log(res.data.userData, "res.data.userData")
            alert(res.data.message)
            if (res.data.message && res.data.userData.email) {
                navigate('/login')
            }
        }).catch((err) => console.log(err))
        return resData;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        sendReqSignUp()
    }
//npm i --force
    return (
        <div>
            <from onSubmit={handleSubmit}>

                <Box display="flex" flexDirection={'column'} width={300} marginLeft='auto' marginRight='auto' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'> SIGNUP</Typography>
                    <TextField margin='normal' variant='outlined' type="text" placeholder='Name' value={inputs.name} onChange={handleChange} name="name" />
                    <TextField margin='normal' variant='outlined' type="email" placeholder='Email' value={inputs.email} onChange={handleChange} name="email" />
                    <TextField margin='normal' variant='outlined' type="password" placeholder='Password' value={inputs.password} onChange={handleChange} name="password" />

                    <Button type='submit' variant='contained' onClick={sendReqSignUp}  > Signup</Button>
                </Box>
            </from>

        </div>
    )
}

export default Signup