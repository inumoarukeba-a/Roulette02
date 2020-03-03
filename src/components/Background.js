import React, { useEffect } from 'react'

const Background = () => {
  const moveBackground = () => {
    let w = window.innerWidth * 2
    let h = window.innerHeight * 2
    let canvas = document.getElementById('background')
    let ctx = canvas.getContext('2d')
    let count = ''
    let time = ''
    let rate = 60
    let arc = 382
    let size = 7
    let speed = 10
    let parts = []
    let colors = ['#FFF', '#f9cccc', '#f39999']

    canvas.setAttribute('width', w)
    canvas.setAttribute('height', h)

    const create = () => {
      time = 0
      count = 0

      for (var i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
        }
      }
    }

    const particles = () => {
      ctx.clearRect(0, 0, w, h)
      for (var i = 0; i < arc; i++) {
        var li = parts[i]
        ctx.beginPath()
        ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false)
        ctx.fillStyle = li.c
        ctx.strokeStyle = li.c
        if (i % 2 === 0) ctx.stroke()
        else ctx.fill()

        li.x = li.x + li.toX * (time * 0.05)
        li.y = li.y + li.toY * (time * 0.05)

        if (li.x > w) {
          li.x = 0
        }
        if (li.y > h) {
          li.y = 0
        }
        if (li.x < 0) {
          li.x = w
        }
        if (li.y < 0) {
          li.y = h
        }
      }
      if (time < speed) {
        time++
      }
      setTimeout(particles, 1000 / rate)
    }
    create()
    particles()
  }

  useEffect(() => {
    moveBackground()
  }, [])

  return (
    <>
      <aside>
        <canvas id="background"></canvas>
      </aside>
    </>
  )
}

export default Background
