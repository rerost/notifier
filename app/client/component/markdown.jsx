import React from 'react'
import ReactDOM from 'react-dom'
import Showdown from 'showdown'

const converter = new Showdown.Converter()
converter.setFlavor('github');

export default class Markdown extends React.Component {
  render() {
    const html = converter.makeHtml(this.props.text)
    return (
      <div dangerouslySetInnerHTML={{__html: html}} />
    )
  }
}
