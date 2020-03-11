import React, { useEffect } from 'react'

import SEO from '../components/SEO'
import Header from '../components/Header'
import Ataru from '../components/Ataru'
import Theme01 from '../components/Theme01'
import Theme02 from '../components/Theme02'
import Theme03 from '../components/Theme03'
import Background from '../components/Background'
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
        <main className="main">
          <Header />
          <Ataru />
          <section id="roulette" className="roulette">
            <div className="roulette__wrapper">
              <div className="roulette__theme">
                <p id="placeholder" className="roulette__placeholder -active">
                  ここにトークテーマが表示されます。
                </p>
                <Theme01 />
                <Theme02 />
                <Theme03 />
              </div>
              <aside className="roulette__shadow"></aside>
            </div>
          </section>
          <button id="trigger">開　始</button>
        </main>
        <Background />
        <Ending />
      </div>
    </>
  )
}

export default IndexPage
