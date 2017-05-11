import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const style = {
}

export default class ColumnItem extends React.Component {
  render() {
    const avatar = <Avatar src={this.props.item.avatar_url} />
    return(
      <ListItem
        leftAvatar={avatar}
        primaryText={this.props.item.content}
        onClick={() => this.props.addColumn(this.props.item.url)}
      />
    );
  }
}
