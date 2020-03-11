import React from 'react'
import styled from '@emotion/styled'
import Ganko from '../images/ganko.jpg'

const Stage = styled.aside`
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  border: 1px solid black;
  background: url(${Ganko}) no-repeat center center;
  background-size: cover;
`

const Background = () => {
  return (
    <>
      <Stage />
    </>
  )
}

export default Background
