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

export default class ReactionButtons extends React.Component {
  componentDidMount() {
    this.props.getReactions()
    this.setInterval = setInterval(this.props.getReactions.bind(this), 60 * 1000)
  }
  componentWillUnmount() {
    clearInterval(this.setInterval)
  }
  render() {
    const reactions = this.props.reactions
    return (
      <div style={{display: "flex", alignItems: "center"}}>
        {
          Object.keys(reactions).map(key => {
            reactions[key]
            return <ReactionButton content={key} user_ids={reactions[key].user_ids} my_user_id={this.props.my_user_id} sendReaction={this.props.sendReaction} />
          })
        }
      </div>
    )
  }
}

export class ReactionButton extends React.Component {
  imgStyle() {
    return {
      cursor: "pointer",
      width: "20px",
      height: "20px",
    }
  }

  style(dissable) {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "5px",
      opacity: dissable ? 0.4 : 1.0,
    }
  }

  render() {
    return (
      <div style={this.style(!(!!this.props.my_user_id && this.props.user_ids.includes(this.props.my_user_id)))} onClick={() => this.props.sendReaction(this.props.content)}>
        <img src={contents[this.props.content]} style={this.imgStyle()} />
        {
          (this.props.user_ids && this.props.user_ids.length != 0) ? <div>{this.props.user_ids.length}</div> : null
        }
      </div>
    )
  }
}
