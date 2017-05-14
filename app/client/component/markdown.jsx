import React from 'react'
import ReactDOM from 'react-dom'
import Showdown from 'showdown'

const converter = new Showdown.Converter()
converter.setFlavor('github');

export default class Markdown extends React.Component {
  render() {
    const html = converter.makeHtml(this.props.text)
    return (
      <div
        dangerouslySetInnerHTML={{__html: html}}
        onClick={(e) => {
          //FIXME 画像かどうかの判定にsrcがあるかどうかで判断してしまっている
          if ($(e.target).attr('src')) {
            this.props.showModal($(e.target).attr('src'))
          }
        }}
      />
    )
  }
}
