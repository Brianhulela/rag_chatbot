import React from 'react'
import ReactMarkdown from "react-markdown";


function Response({message}) {
  return (
    <ReactMarkdown>{message.text}</ReactMarkdown>
  )
}

export default Response