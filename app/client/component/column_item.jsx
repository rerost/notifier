import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

export default class ColumnItem extends React.Component {
  render() {
    const avatar = <Avatar src={this.props.item.avatar_url} />
    return(
      <Card>
        <CardHeader
          title={"@" + this.props.item.user_login}
          avatar={this.props.item.avatar_url}
        />
        <CardText>
          {this.props.item.content}
        </CardText>
        <CardActions style={{display: "flex", alignItems: "center"}}>
          <FlatButton label="Fav" />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          >
            <MenuItem primaryText="Mark as Read" />
            <MenuItem primaryText="Open in Github.com"/>
          </IconMenu>
        </CardActions>
      </Card>
    );
  }
}
