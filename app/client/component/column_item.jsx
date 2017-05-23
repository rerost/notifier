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
import Paper from 'material-ui/Paper';

import Markdown from './markdown.jsx'
import ReactionButtons from './reaction_buttons.jsx'

const imgStyle = {
  cursor: "pointer",
  width: "15px",
  height: "15px",
  opacity: 0.4,
}

export default class ColumnItem extends React.Component {
  render() {
    const avatar = <Avatar src={this.props.item.avatar_url} />
    if(this.props.isMainColumn) {
      return (
        <Paper style={{marginTop: "5px", marginBottom: "5px"}}>
          <ListItem
            leftAvatar={avatar}
            primaryText={<div style={{overflow: "hidden", textOverflow: "ellipsis"}}>{this.props.item.content ? this.props.item.content : "EMPTY"}</div>}
            rightIconButton={
              <IconMenu
                iconButtonElement={
                  <IconButton onClick={(e) => e.stopPropagation()}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem primaryText="Mark as Read" onClick={(e) => this.props.checkNotification(this.props.columnUrl, this.props.item.key, this.props.item.thread_url)}/>
                <MenuItem primaryText="Open in Browser" onClick={() => window.open(this.props.item.html_url)}/>
              </IconMenu>
            }
            onClick={() => this.props.addColumn(this.props.item.url)}
          />
        </Paper>
      )
    }
    const sendReaction = (content) => {
      this.props.sendReaction(this.props.columnUrl, this.props.item.key, this.props.item.comment_url, content)
    }
    return(
      <Card style={{marginTop: "5px", marginBottom: "5px"}}>
        <CardHeader
          title={this.props.item.user_login}
          subtitle={this.props.item.user_name}
          avatar={this.props.item.avatar_url}
        />
        <CardText>
          <Markdown text={this.props.item.content} showModal={this.props.showModal}/>
        </CardText>
        <CardActions style={{display: "flex", alignItems: "center", justifyContent: "right"}}>
          <ReactionButtons
            reactions={[
              {content: "+1",       count: 0, dissable: true},
              {content: "-1",       count: 0, dissable: true},
              {content: "laugh",    count: 0, dissable: true},
              {content: "hooray",   count: 0, dissable: true},
              {content: "confused", count: 0, dissable: true},
              {content: "heart",    count: 0, dissable: false},
            ]}
            sendReaction={sendReaction}
          />
          <IconButton style={{marginRight: 0, marginLeft: "auto"}} iconClassName="muidocs-icon-custom-github" onClick={() => window.open(this.props.item.html_url)}/>
        </CardActions>
      </Card>
    );
  }
}
