import React from 'react'
import ReactDOM from 'react-dom'

const contents = {
  "+1":       "https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png",
  "-1":       "https://assets-cdn.github.com/images/icons/emoji/unicode/1f44e.png",
  "laugh":    "https://assets-cdn.github.com/images/icons/emoji/unicode/1f604.png",
  "hooray":   "https://assets-cdn.github.com/images/icons/emoji/unicode/1f389.png",
  "confused": "https://assets-cdn.github.com/images/icons/emoji/unicode/1f615.png",
  "heart":    "https://assets-cdn.github.com/images/icons/emoji/unicode/2764.png",
}

const imgStyle = {
  cursor: "pointer",
  width: "15px",
  height: "15px",
  opacity: 0.4,
}

export default class ReactionButtons extends React.Component {
  reander() {
    return (
      <div>
        {this.props.reactions.map((reactions) => {
          <ReactionButton content={reactions.content} count={reactions.count}  />
        })}
      </div>
    )
  }
}

export class ReactionButton extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.sendReaction(this.props.content)}>
        <img src={contents[this.props.content]} style={imgStyle} />
      </div>
    )
  }
}
