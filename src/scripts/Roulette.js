// import _ from 'lodash'
import gsap from 'gsap'

import AUDIO_DRUM_REPEAT from '../audios/drum-repeat.mp3'
import AUDIO_DRUM_NED from '../audios/drum-end.mp3'
import AUDIO_ENDING from '../audios/ending.mp3'
import AUDIO_NOISE from '../audios/noise.mp3'

const Roulette = () => {
  /**
   * Variables
   */
  const $ROULETTE = document.getElementById('roulette')
  const $TRIGGER = document.getElementById('trigger')
  const $PLACEHOLDER = document.getElementById('placeholder')
  const $HEADER_TITLE = document.getElementById('header__title')
  const $HEADER_LOGO = document.getElementById('header__logo')
  const $ATARU = document.getElementById('ataru')
  const $ATARU_WRAPPER = document.getElementById('ataru__wrapper')
  const DELAY = 1.618
  const DUMMY = [
    '今だから話せる失敗談を教えてください。',
    'プログラムを作るとき、どんなポイントを意識されていますか？',
    '最初に当たった壁はなんでしたか？',
    '通勤時間って何をしていますか？',
    '今後やってみたいプログラムはありますか？',
  ]
  const DUMMY_LENGTH = DUMMY.length
  const INSTANCE_ADUIO = new Audio()

  let $theme = document.getElementById('theme01')
  let interval = -1
  let first_flag = false
  let roulette_flag = false
  let roulette_length
  let random
  let $active_theme

  /**
   * Roulette
   */
  const buttonEventSwither = event => {
    $PLACEHOLDER.classList.remove('-active')
    if (roulette_flag === false) {
      playAudio({ source: AUDIO_DRUM_REPEAT, loop: true })
      startAnimation()
      startRoulette()
      startButton()
    } else {
      playAudio({ source: AUDIO_DRUM_NED, loop: false })
      stopAnimation()
      stopRoulette()
      stopButton()
    }
  }

  /**
   * Audio
   */
  const playAudio = ({ source = null, loop = false }) => {
    INSTANCE_ADUIO.currentTime = 0
    INSTANCE_ADUIO.src = source
    INSTANCE_ADUIO.loop = loop
    INSTANCE_ADUIO.play()
  }

  /**
   * Animation
   */
  const startAnimation = event => {
    const TL = gsap.timeline()
    if (first_flag === false) {
      first_flag = true
      TL.add('first')
        .to(
          $HEADER_TITLE,
          DELAY / 3,
          {
            y: '-90%',
            scale: 0.382,
            ease: 'power3.easeout',
          },
          'first'
        )
        .to(
          $ATARU,
          DELAY / 1.618,
          {
            x: 0,
            ease: 'power1.easeout',
          },
          'first'
        )
        .to(
          $HEADER_LOGO,
          DELAY / 1.618,
          {
            x: 0,
            ease: 'power1.easein',
          },
          'first+=1'
        )
        .to($HEADER_LOGO, DELAY / 3.82, {
          textShadow:
            '0 0 2.5px #fff, 0 0 4px #fff, 0 0 10px #f3003d, 0 0 17.5px #f3003d, 0 0 20px #f3003d',
          ease: 'power1.easein',
        })
        .add('logo-in')
        .to(
          $ROULETTE,
          DELAY,
          {
            y: 0,
            ease: 'bounce.easeout',
          },
          'logo-in+=1.5'
        )
        .add('roulette-in')
        .set(
          $HEADER_LOGO,
          {
            autoAlpha: 0,
          },
          'roulette-in'
        )
        .to(
          $ATARU_WRAPPER,
          DELAY / 3.82,
          {
            scale: 0.08,
            ease: 'power1.easeout',
          },
          'roulette-in-=.5'
        )
        .add('scale-out')
        .set(
          $ATARU,
          {
            position: 'absolute',
            y: '-90%',
            width: '100%',
          },
          'scale-out+=.1'
        )
        .set(
          $ATARU_WRAPPER,
          {
            height: 2000,
            width: '100%',
            transformOrigin: 'center bottom',
          },
          'scale-out+=.1'
        )
        .add('set-stage')
        .to(
          $ATARU,
          DELAY / 5,
          {
            y: '-100%',
            ease: 'power1.easeout',
          },
          'set-stage+=.2'
        )
    } else {
      TL.to($ROULETTE, DELAY / 5, {
        scale: 1,
        ease: 'power1.easeout',
      }).to($ATARU, DELAY / 3, {
        y: '-100%',
        ease: 'power1.easeout',
        onComplete: () => {
          $ATARU.classList.remove('-stop')
        },
      })
    }
  }
  const stopAnimation = event => {
    $ATARU.classList.add('-stop')
    const TL = gsap.timeline()
    TL.to($ROULETTE, 0.1618, {
      scale: 1.1382,
      ease: 'power1.easeout',
    }).to($ATARU, DELAY / 1.618, {
      y: '-90%',
      ease: 'power1.easeout',
    })
  }

  /**
   * Roulette
   */
  const startRoulette = event => {
    // 前のテーマを削除
    if ($active_theme !== undefined) {
      $active_theme.remove()
    }
    // テーマ数を取得
    roulette_length = $theme.childElementCount
    // ダミー要素を追加
    for (let i = 0; i < DUMMY_LENGTH; i++) {
      const $LI = document.createElement('li')
      const TEXT = document.createTextNode(DUMMY[i])
      $LI.className = '-dummy'
      $theme.appendChild($LI)
      $LI.appendChild(TEXT)
    }
    // フラグを設定
    roulette_flag = true
    // ルーレット
    interval = setInterval(() => {
      // アクティブなテーマをリセット
      Array.prototype.forEach.call($theme.children, (e, index) => {
        e.classList.remove('-active')
      })
      // ランダムで表示
      random = Math.floor(Math.random() * (roulette_length + DUMMY_LENGTH))
      $active_theme = $theme.children[random]
      $active_theme.classList.add('-active')
    }, 80)
  }
  const stopRoulette = event => {
    // インターバルをクリア
    clearTimeout(interval)
    // フラグを設定
    roulette_flag = false
    // ダミーを削除
    let $DUMMY_ELEMENTS = document.getElementsByClassName('-dummy')
    for (let i = 0; i < DUMMY_LENGTH; i++) {
      $DUMMY_ELEMENTS[0].remove()
    }
    // 一度テーマをリセット（ダミーの関係上）
    $active_theme.classList.remove('-active')
    // ランダム表示
    random = Math.floor(Math.random() * roulette_length)
    $active_theme = $theme.children[random]
    $active_theme.classList.add('-active')
  }

  /**
   * Button
   */
  const startButton = event => {
    $TRIGGER.innerHTML = '決　定'
    $TRIGGER.classList.add('-stop')
  }
  const stopButton = event => {
    $TRIGGER.classList.remove('-stop')
    $TRIGGER.innerHTML = '開　始'
  }

  /**
   * Triggers
   */
  $TRIGGER.addEventListener('click', event => {
    buttonEventSwither()
  })

  window.addEventListener('keydown', event => {
    const KEYCODE = event.keyCode
    if (roulette_flag === false) {
      switch (KEYCODE) {
        // F7
        case 118:
          $theme = document.getElementById('theme01')
          $ROULETTE.classList.remove('-theme02', '-theme03')
          $ROULETTE.classList.add('-theme01')
          break
        // F8
        case 119:
          $theme = document.getElementById('theme02')
          $ROULETTE.classList.remove('-theme01', '-theme03')
          $ROULETTE.classList.add('-theme02')
          break
        // F9
        case 120:
          $theme = document.getElementById('theme03')
          $ROULETTE.classList.remove('-theme01', '-theme02')
          $ROULETTE.classList.add('-theme03')
          break
        default:
          break
      }
    }
    switch (KEYCODE) {
      // Space
      case 32:
        buttonEventSwither()
        break
      // F1
      case 112:
        playAudio({ source: AUDIO_ENDING, loop: true })
        break
      // F2
      case 113:
        playAudio({ source: AUDIO_NOISE, loop: true })
        break
      default:
        break
    }
  })
}

export default Roulette
