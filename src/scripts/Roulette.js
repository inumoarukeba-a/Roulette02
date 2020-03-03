// import _ from 'lodash'
import gsap from 'gsap'

import AUDIO_DRUM_REPEAT from '../audios/drum-repeat.mp3'
import AUDIO_MIYAZAKI_REPEAT02 from '../audios/miyazaki-repeat02.mp3'
import AUDIO_MIYAZAKI_REPEAT01 from '../audios/miyazaki-repeat.mp3'
import AUDIO_ASHIDA_REPEAT02 from '../audios/ashida-repeat02.mp3'
import AUDIO_ASHIDA_REPEAT01 from '../audios/ashida-repeat.mp3'
import AUDIO_DRUM_NED from '../audios/drum-end.mp3'
import AUDIO_MIYAZAKI_END from '../audios/miyazaki-end.mp3'
import AUDIO_ASHIDA_END from '../audios/ashida-end.mp3'

const Roulette = () => {
  const $ROULETTE = document.getElementById('roulette')
  const $TRIGGER = document.getElementById('trigger')
  const $PLACEHOLDER = document.getElementById('placeholder')
  // const $DRUM_REPEAT = document.getElementById('drum-repeat')
  // const $DRUM_END = document.getElementById('drum-end')
  const $HEADER_TITLE = document.getElementById('header__title')
  const $HEADER_LOGO = document.getElementById('header__logo')
  const $ATARU = document.getElementById('ataru')
  const $ATARU_WRAPPER = document.getElementById('ataru__wrapper')
  const DELAY = 1.618
  const DUMMY = [
    '家庭ではどんなディレクターでしょうか？',
    '今だから話せる失敗談を教えてください。',
    '画面構成を作るとき、どんなポイントを意識されていますか？',
    'わかりやすい文章やメールのコツとかありますか',
    'ディレクターになって、最初に当たった壁はなんでしたか？',
    '通勤時間って何をしていますか？',
    '今後やってみたい案件・プロジェクトはありますか？',
  ]
  const DUMMY_LENGTH = DUMMY.length

  let $theme = document.getElementById('theme01')
  let interval = -1
  let first_flag = false
  let roulette_flag = false
  let roulette_length
  let random
  let $active_theme
  let start_audio = new Audio()
  let end_audio = new Audio()
  let num
  let source

  /* Triggers
  ───────────────────────── */
  $TRIGGER.addEventListener('click', event => {
    ROULETTE()
  })

  window.addEventListener('keydown', event => {
    const KEYCODE = event.keyCode
    if (roulette_flag === false) {
      // F7
      if (KEYCODE === 118) {
        $theme = document.getElementById('theme01')
        $ROULETTE.classList.remove('-theme02', '-theme03')
        $ROULETTE.classList.add('-theme01')
      }
      // F8
      if (KEYCODE === 119) {
        $theme = document.getElementById('theme02')
        $ROULETTE.classList.remove('-theme01', '-theme03')
        $ROULETTE.classList.add('-theme02')
      }
      // F9
      if (KEYCODE === 120) {
        $theme = document.getElementById('theme03')
        $ROULETTE.classList.remove('-theme01', '-theme02')
        $ROULETTE.classList.add('-theme03')
      }
    }
    // Space
    if (KEYCODE === 32) {
      ROULETTE()
    }
  })

  /* Functions
  ───────────────────────── */
  const ROULETTE = event => {
    $PLACEHOLDER.classList.remove('-active')
    if (roulette_flag === false) {
      START_AUDIO()
      START_ANIMATION()
      START_ROULETTE()
      START_BUTTON()
    } else {
      STOP_AUDIO()
      STOP_ANIMATION()
      STOP_ROULETTE()
      STOP_BUTTON()
    }
  }

  // オーディオ
  const START_AUDIO = event => {
    // オーディオストップ
    end_audio.pause()
    end_audio.currentTime = 0
    // ランダム & 確率判定
    num = Math.floor(Math.random() * 100)
    source = AUDIO_DRUM_REPEAT
    if (num <= 24) source = AUDIO_MIYAZAKI_REPEAT02
    if (num <= 18) source = AUDIO_MIYAZAKI_REPEAT01
    if (num <= 12) source = AUDIO_ASHIDA_REPEAT02
    if (num <= 6) source = AUDIO_ASHIDA_REPEAT01
    // 再生
    start_audio.src = source
    start_audio.loop = true
    start_audio.play()
  }

  const STOP_AUDIO = event => {
    // オーディオストップ
    start_audio.pause()
    start_audio.currentTime = 0
    // ランダム & 確率判定
    source = AUDIO_DRUM_NED
    if (num <= 24) source = AUDIO_MIYAZAKI_END
    if (num <= 12) source = AUDIO_ASHIDA_END
    // 再生
    end_audio.src = source
    end_audio.play()
  }

  // アニメーション
  const START_ANIMATION = event => {
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

  const STOP_ANIMATION = event => {
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

  // ルーレット
  const START_ROULETTE = event => {
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

  const STOP_ROULETTE = event => {
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

  // ボタン
  const START_BUTTON = event => {
    $TRIGGER.innerHTML = 'STOP'
    $TRIGGER.classList.add('-stop')
  }

  const STOP_BUTTON = event => {
    $TRIGGER.classList.remove('-stop')
    $TRIGGER.innerHTML = 'START'
  }
}

export default Roulette
