import React, { StrictMode,Suspense } from 'react'
import { render } from 'react-dom'
import  App  from './App'

// styles

console.log(process.env.SECRET)

import logo from './assets/logo.png'

const imgStyles = {
  width: '100px',
  display: 'block',
  margin: '0.5rem auto 0'
}

const rootEl = document.getElementById('rootbase')
    render(
        <StrictMode>
          <img src={logo} alt='#' style={imgStyles} />
          <App />
        </StrictMode>,
        rootEl
      )
