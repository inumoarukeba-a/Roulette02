import React, { useEffect } from 'react'

import SEO from '../components/SEO'
import Theme01 from '../components/Theme01'
import Theme02 from '../components/Theme02'
import Background from '../components/Background'
import Opening from '../components/Opening'
import Ending from '../components/Ending'

import Roulette from '../scripts/Roulette'

const IndexPage = () => {
  useEffect(() => {
    // ルーレット
    new Roulette()
  }, [])

  return (
    <>
      <SEO />
      <div className="wrapper">
        <Opening />
        <main className="main">
          <aside className="roulette__blackIn"></aside>
          <section id="roulette" className="roulette">
            <div className="roulette__wrapper">
              <div className="roulette__theme">
                <p className="roulette__placeholder -active">
                  ここにトークテーマが表示されます。
                </p>
                <Theme01 />
                <Theme02 />
              </div>
              <aside className="roulette__shadow"></aside>
            </div>
          </section>
          <button className="roulette__trigger">開　始</button>
          <Background />
        </main>
        <Ending />
      </div>
    </>
  )
}

export default IndexPage
