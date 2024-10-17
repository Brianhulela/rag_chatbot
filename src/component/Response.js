import React from 'react'
import ReactMarkdown from "react-markdown";


function Response({response}) {
  return (
    <ReactMarkdown>{response}</ReactMarkdown>
  )
}

export default Response