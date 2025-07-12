import React from 'react'

function Logo({width = "100%"}) {
  return (
    <img src='/default.png' style={{width}} alt='Logo' />
  )
}

export default Logo