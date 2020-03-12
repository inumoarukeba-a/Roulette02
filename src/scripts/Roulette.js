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
  const $ROULETTE = document.querySelector('.roulette')
  const $ROULETTE_TRIGGER = document.querySelector('.roulette__trigger')
  const $PLACEHOLDER = document.querySelector('.roulette__placeholder')
  const $OPENING_LOGOTYPE = document.querySelector('.opening__logotype')
  const $ENDING = document.querySelector('.ending')
  const DELAY = 1.618
  const DUMMY = [
    '今だから話せる失敗談を教えてください。',
    'プログラムを作るとき、どんなポイントを意識されていますか？',
    '最初に当たった壁はなんでしたか？',
    '通勤時間って何をしていますか？',
    '今後やってみたいプログラムはありますか？',
  ]
  const DUMMY_LENGTH = DUMMY.length
  const RESPONSE_AUDIO = new Audio()
  const BGM_AUDIO = new Audio()

  let $theme = document.querySelector('#theme01')
  let interval = -1
  let roulette_flag = false
  let first_flag = false
  let roulette_length
  let random
  let $active_theme

  /**
   * Event Group
   */
  const buttonEventSwither = () => {
    $PLACEHOLDER.classList.remove('-active')
    if (roulette_flag === false) {
      playAudio({
        instance: RESPONSE_AUDIO,
        source: AUDIO_DRUM_REPEAT,
        loop: true,
        volume: 1,
        fadeIn: false,
      })
      startAnimation()
      startRoulette()
      startButton()
    } else {
      playAudio({
        instance: RESPONSE_AUDIO,
        source: AUDIO_DRUM_NED,
        loop: false,
        volume: 1,
        fadeIn: false,
      })
      stopAnimation()
      stopRoulette()
      stopButton()
    }
  }

  /**
   * Audio
   */
  const playAudio = ({
    instance = null,
    source = null,
    loop = false,
    volume = 1,
    fadeIn = false,
    fadeInSpeed = 1300,
  } = {}) => {
    instance.currentTime = 0
    instance.src = source
    instance.loop = loop
    instance.play()
    if (!fadeIn) {
      instance.volume = volume
    } else {
      instance.volume = 0
      const volumeFadeIn = setInterval(function() {
        instance.volume = instance.volume + volume / 100
        if (instance.volume >= volume - volume / 100) {
          instance.volume = volume
          clearInterval(volumeFadeIn)
        }
      }, (fadeInSpeed * volume) / 100)
    }
  }

  /**
   * Animation
   */
  const openingAnimation = () => {
    setTimeout(() => {
      playAudio({
        instance: BGM_AUDIO,
        source: AUDIO_NOISE,
        loop: true,
        volume: 0.1618,
        fadeIn: true,
        fadeInSpeed: 34000,
      })
    }, 1300)
    const TIMELINE = gsap.timeline()
    TIMELINE.add('first')
      .to($OPENING_LOGOTYPE, {
        duration: 5.5,
        rotationY: 180 * 7,
        ease: 'back.out(1.1618)',
      })
      .to('.opening__message--image', {
        duration: 0.8,
        opacity: 1,
        ease: 'power1.out',
      })
      .add('shout')
      .to(
        '.opening__shout--image',
        {
          duration: 1.3,
          scale: 1,
          stagger: 0.1,
          ease: 'bounce.out',
        },
        'shout+=.3'
      )
      .to(
        '.opening__shout--image',
        {
          duration: 1.3,
          opacity: 1,
          stagger: 0.1,
          ease: 'power1.out',
        },
        'shout+=.3'
      )
      .add('roulette')
      .to(
        '.opening',
        {
          duration: 0.5,
          y: '-100%',
          ease: 'power1.out',
        },
        'roulette+=1.3'
      )
      .to(
        '.roulette__blackIn',
        {
          duration: 3.4,
          autoAlpha: 0,
          ease: 'power1.out',
        },
        '-=.5'
      )
  }

  const startAnimation = () => {
    const TIMELINE = gsap.timeline()
    if (first_flag === false) {
      first_flag = true
      TIMELINE.to(
        '.roulette',
        {
          duration: 1.3,
          y: 0,
          ease: 'bounce.out',
        },
        '+=.8'
      )
    } else {
      TIMELINE.to($ROULETTE, DELAY / 5, {
        scale: 1,
        ease: 'power1.easeout',
      })
    }
  }
  const stopAnimation = () => {
    const TIMELINE = gsap.timeline()
    TIMELINE.to($ROULETTE, 0.1618, {
      scale: 1.1382,
      ease: 'power1.easeout',
    })
  }

  const endingAnimation = () => {
    setTimeout(() => {
      RESPONSE_AUDIO.pause()
      playAudio({
        instance: BGM_AUDIO,
        source: AUDIO_ENDING,
        loop: true,
        volume: 1,
        fadeIn: true,
        fadeInSpeed: 3400,
      })
    }, 1300)
    const TIMELINE = gsap.timeline()
    TIMELINE.add('first')
      .to($ENDING, {
        duration: 3.4,
        opacity: 1,
        ease: 'power1.easeout',
      })
      .to($ROULETTE, {
        duration: 0.8,
        opacity: 0,
        ease: 'power1.easeout',
      })
      .to(
        '.ending__wrapper',
        {
          duration: 3.4,
          opacity: 1,
          y: 0,
          ease: 'power1.easeout',
        },
        '+=3.4'
      )
      .to(
        '.ending__text',
        {
          duration: 2.1,
          opacity: 1,
          y: 0,
          stagger: 1.7,
          ease: 'power1.easeout',
        },
        '+=.8'
      )
  }

  /**
   * Roulette
   */
  const startRoulette = () => {
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
  const stopRoulette = () => {
    // インターバルをクリア
    clearTimeout(interval)
    // フラグを設定
    roulette_flag = false
    // ダミーを削除
    let $DUMMY_ELEMENTS = document.querySelectorAll('.-dummy')
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
  const startButton = () => {
    $ROULETTE_TRIGGER.innerHTML = '決　定'
    $ROULETTE_TRIGGER.classList.add('-stop')
  }
  const stopButton = () => {
    $ROULETTE_TRIGGER.classList.remove('-stop')
    $ROULETTE_TRIGGER.innerHTML = '開　始'
  }

  /**
   * Triggers
   */
  $ROULETTE_TRIGGER.addEventListener('click', () => {
    buttonEventSwither()
  })
  $OPENING_LOGOTYPE.addEventListener(
    'click',
    () => {
      openingAnimation()
    },
    {
      once: true,
    }
  )

  window.addEventListener('keydown', event => {
    const KEYCODE = event.keyCode
    if (roulette_flag === false) {
      switch (KEYCODE) {
        // F7
        case 118:
          $theme = document.querySelector('#theme01')
          $ROULETTE.classList.remove('-theme02', '-theme03')
          $ROULETTE.classList.add('-theme01')
          break
        // F8
        case 119:
          $theme = document.querySelector('#theme02')
          $ROULETTE.classList.remove('-theme01', '-theme03')
          $ROULETTE.classList.add('-theme02')
          break
        // F9
        case 120:
          $theme = document.querySelector('#theme03')
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
        endingAnimation()
        break
      // F2
      case 113:
        BGM_AUDIO.pause()
        break
      default:
        break
    }
  })
}

export default Roulette
