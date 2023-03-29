import React from 'react'
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import axios from 'axios'
axios.default.withCredentials = true
const Header = () => {
  const [value, setValue] = useState()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()
  const logoutReq = async () => {
    const res = await axios.post("http://localhost:5000/logout", null, { withCredentials: true })
    if (res.status == 200) {
      return res
    }
    return new Error("Unable to logout. Please try again")
  }
  const handleLogout = () => {
    logoutReq().then(() => dispatch(authActions.logout()))
  }
  console.log(isLoggedIn,"isLoggediNnnn")
  return (
    <div >
      <AppBar position='sticky'>
        <Toolbar>
          {/* allow to add some text  */}
          <Typography variant='h3'>MERN-Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs textColor='inherit' onChange={(e, val) => setValue(val)} value={value} indicatorColor='secondary'>
              {isLoggedIn == false && <>
                <Tab label="Login" LinkComponent={Link} to='/login' />
                <Tab label="Signup" LinkComponent={Link} to='/signup' /> </>}
              {isLoggedIn && <Tab label="/" LinkComponent={Link} to='/Logout' onClick={handleLogout} />}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default Header