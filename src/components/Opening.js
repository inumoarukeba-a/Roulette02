import React from 'react'
import LogoGanko from '../images/ganko.png'
import LogoTakeshi from '../images/takeshi.png'
import Shout01 from '../images/shout01.png'
import Shout02 from '../images/shout02.png'
import Message01 from '../images/message01.png'

const Opening = () => {
  return (
    <>
      <aside className="opening">
        <p className="opening__shout">
          <img
            className="opening__shout--image"
            src={Shout01}
            width="640"
            alt=""
          />
        </p>
        <h1 className="opening__logotype">
          <div className="opening__logotype--front">
            <img
              className="opening__logotype--image"
              src={LogoGanko}
              width="640"
              alt=""
            />
          </div>
          <div className="opening__logotype--back">
            <img
              className="opening__logotype--image"
              src={LogoTakeshi}
              width="640"
              alt=""
            />
          </div>
        </h1>
        <p className="opening__message">
          <img
            className="opening__message--image"
            src={Message01}
            width="640"
            alt=""
          />
        </p>
        <p className="opening__shout">
          <img
            className="opening__shout--image"
            src={Shout02}
            width="640"
            alt=""
          />
        </p>
      </aside>
    </>
  )
}

export default Opening
