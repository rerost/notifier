import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const remote = require('electron').remote
const { openUrl } = remote.require('./index.js')

import Markdown from './markdown'

export default class ColumnItem extends React.Component {
  render() {
    const avatar = <Avatar src={this.props.item.avatar_url} />
    if(this.props.isMainColumn) {
      const truncated_context = this.props.item.content.substring(0, 24) + ((this.props.item.content.length > 24) ? "..." : "") //FIXME think japanese
      return (<ListItem
        leftAvatar={avatar}
        primaryText={truncated_context}
        rightIconButton={
          <IconMenu
            iconButtonElement={
              <IconButton onClick={(e) => e.stopPropagation()}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Mark as Read" onClick={(e) => this.props.checkNotification(this.props.columnUrl, this.props.item.key, this.props.item.thread_url)}/>
          </IconMenu>
        }
        onClick={() => this.props.addColumn(this.props.item.url)}
      />)
    }
    return(
      <Card>
        <CardHeader
          title={this.props.item.user_login}
          avatar={this.props.item.avatar_url}
        />
        <CardText>
          <Markdown text={this.props.item.content} />
        </CardText>
        <CardActions style={{display: "flex", alignItems: "center"}}>
          <IconButton>
            <ActionGrade />
          </IconButton>
          <IconMenu
            iconButtonElement={<IconButton><NavigationExpandMoreIcon /></IconButton>}
          >
            <MenuItem primaryText="Open in Browser" onClick={() => openUrl(this.props.item.html_url)}/>
          </IconMenu>
        </CardActions>
      </Card>
    );
  }
}
