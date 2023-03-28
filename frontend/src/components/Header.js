import React from 'react'
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    const [value,setValue]=useState()
    return (
      <div >
        <AppBar position='sticky'>
          <Toolbar>
            {/* allow to add some text  */}
            <Typography variant='h3'>MERN-Auth</Typography>
            <Box sx={{marginLeft:"auto"}}>
              <Tabs textColor='inherit' onChange={(e,val)=>setValue(val)}  value={value} indicatorColor='secondary'>
                <Tab label="Login" LinkComponent={Link} to='/login' />
                <Tab label="Signup" LinkComponent={Link} to='/signup'/>
              </Tabs>
            </Box>
          </Toolbar>
        </AppBar>
  
      </div>
  )
}

export default Header