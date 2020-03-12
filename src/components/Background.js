import React from 'react'
import styled from '@emotion/styled'
import BackgroundGanko from '../images/background.jpg'

const Stage = styled.aside`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  background: url(${BackgroundGanko}) no-repeat center center;
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
