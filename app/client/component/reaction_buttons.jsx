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

const imgStyle = (dissable) => {
  return {
    cursor: "pointer",
    width: "20px",
    height: "20px",
    opacity: dissable ? 0.4 : 1.0,
  }
}

export default class ReactionButtons extends React.Component {
  render() {
    return (
      <div style={{display: "flex", alignItems: "center"}}>
        {this.props.reactions.map((reaction) => {
          return <ReactionButton content={reaction.content} count={reaction.count} dissable={reaction.dissable} sendReaction={this.props.sendReaction} />
        })}
      </div>
    )
  }
}

export class ReactionButton extends React.Component {
  render() {
    return (
      <div style={{padding: "5px"}} onClick={() => this.props.sendReaction(this.props.content)}>
        <img src={contents[this.props.content]} style={imgStyle(this.props.dissable)} />
      </div>
    )
  }
}
