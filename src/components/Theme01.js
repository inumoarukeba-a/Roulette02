import React from 'react'

const Theme01 = () => {
  return (
    <>
      <ul id="theme01" className="roulette__list">
        <li>体調など大丈夫ですか...？</li>
        <li>仕事専用の携帯電話欲しいですか？</li>
        <li>
          他の職種に短期留学したいですか？
          <br />
          どの職種？
        </li>
        <li>家庭ではどんなディレクターでしょうか？</li>
        <li>
          プロジェクト進行中に飛び出した
          <br />
          名言<span className="-small">（マジなやつ）</span>
          を教えてください。
        </li>
        <li>
          案件進行中の悩みは
          <br />
          誰に相談したり聞いてもらっていますか？
        </li>
        <li>通勤時間って何をしていますか？</li>
        <li>
          仕事のやり方や姿勢で
          <br />
          尊敬している有名人はいますか？
        </li>
        <li>
          自由にイメチェンできるなら、
          <br />
          何をどんなふうに変えてみたいですか？
          <br />
          <span className="-small">
            （ヘアスタイル、メガネ、ひげ、ファッションなど）
          </span>
        </li>
      </ul>
    </>
  )
}

export default Theme01
