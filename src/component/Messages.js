import { Box } from '@mui/material'
import React from 'react'
import Query from './Query'
import Response from './Response'

function Messages({response}) {
  return (
    <Box sx={{pb: "100px"}}>
        <Query/>
        <Response response={response}/>
    </Box>
  )
}

export default Messages