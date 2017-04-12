import React from 'react'
import ReactDOM from 'react-dom'
import ColumnItem from './column_item.jsx'

const style = {
  marginRight: "10px",
  marginLeft:  "10px",
  width: "300px",
}

const title_style = {
  backgroundColor: "#ddd",
  height: "50px",
  fontSize: "40px",
}

export default class Column extends React.Component {
  render() {
    //user_id:         speakers service id
    //content_id:      contents id (another service id need check)
    //user_name:       service user name
    //content:         Speech content
    //reply_content:   reply about what content
    //reply_user:      reply about what user_id
    const _items = [
      {user_id: "@rerost", content_id: 1, user_name:"れろすと", content:"hogehogehoge",   reply_content:null, reply_user_id:null},
      {user_id: "@edaqqq", content_id: 2, user_name:"えだ",    content:"@rerost foobar", reply_content:1, reply_user_id:1}
    ]
    const items = _items.map((item) => <ColumnItem key={item.content_id} item={item} />)
    return(
      <div style={style}>
        <p style={title_style}>{this.props.name}</p>
        {items}
      </div>
    );
  }
}
