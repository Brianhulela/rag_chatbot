import { Box } from '@mui/material'
import React from 'react'
import Query from './Query'
import Response from './Response'

function Messages({response, messages, streamedResponse}) {
  return (
    <Box sx={{pb: "100px"}}>
      {/** Map through the messages array and render each message, if message.sender is "USER" render query */}
        {messages.map((message) => {
            if(message.sender === "USER"){
                return <Query key={message.id} message={message}/>
            }else{
                return <Response key={message.id} message={message}/>
            }
        })}

        {streamedResponse.length > 0 && <Response message={{text: streamedResponse, sender: "AI"}}/>}
    </Box>
  )
}

export default Messages