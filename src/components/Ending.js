import React from 'react'
import Uchida from '../images/uchida.jpg'

const Ending = () => {
  return (
    <>
      <aside className="ending">
        <div className="ending__wrapper">
          <img className="ending__image" src={Uchida} width="1280" alt="" />
          <div className="ending__message">
            <p className="ending__text">内田さ〜ん。</p>
            <p className="ending__text">約10年間お疲れ様でした&amp;</p>
            <p className="ending__text">ありがとうございました。</p>
            <p className="ending__text">よければ最後に一言ください:)</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Ending
