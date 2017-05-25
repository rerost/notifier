import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules';

import Github from '../service/github.js'

import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
//See https://github.com/callemall/material-ui/issues/4670#issuecomment-231603600
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ColumnItem from './column_item.jsx'
import ColumnSettingButton from './column_setting_button.jsx'

const progress_style = {
  display: "block",
  margin:  "auto"
}

const style = {
  base: {
    display: "inline-block",
    marginRight: "10px",
    marginLeft:  "10px",
    height: "100vh",
    width: "300px",
  },

  head: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ddd",
    name: {
      width: "80%",
      paddingRight: "20px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "40px",
    },
    closeButton: {
      width: "10%",
      cursor: "pointer",
    },
  },

  body: {
    height: "100%",
    overflow: "scroll",
  },
}

export default class Column extends React.Component {
  update() {
    this.props.updateColumn(this.props.url, this.props.updateAt)
  }
  componentDidMount() {
    this.setInterval = setInterval(this.update.bind(this), 60 * 1000)
  }
  componentWillUpdate(nextProps) {
    if (nextProps.isMainColumn) {
      const items = nextProps.items.filter(item => !this.props.items.map(item_ => item_.key).includes(item.key))
      items.map(item => {
        var n = new Notification('Notifier', {
          body: item.content
        });
        n.onclick = () => {
          window.open(item.html_url)
        }
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.setInterval)
  }
  render() {
    return(
      <div style={style.base}>
        <AppBar
          title={this.props.name}
          iconElementLeft={this.props.isMainColumn ? null :
            <ColumnSettingButton
              muiName='IconMenu'
              deleteColumn={() => this.props.deleteColumn(this.props.url)}
            />
          }
        />
        <div style={style.body}>
          <List style={{padding: "6px"}}>
            {(() => {
              if (this.props.isFetching && this.props.items.length == 0)
                return (
                  <div>
                    <CircularProgress style={progress_style} size={40} thickness={5} />
                  </div>
                )
              else if (this.props.items.length == 0)
                return (
                  <div>
                    No description provided
                  </div>
                )
              else
                return (
                  this.props.items.map((item) => {
                    return (
                      <ColumnItem
                        key={item.key}
                        item={item}
                        main={this.props.main}
                        columnUrl={this.props.url}
                        isMainColumn={this.props.isMainColumn}
                        addColumn={this.props.addColumn}
                        checkNotification={this.props.checkNotification}
                        showModal={this.props.showModal}
                        sendReaction={this.props.sendReaction}
                        getReactions={this.props.getReactions}
                      />
                    )
                  })
                )
            })()}
          </List>
        </div>
      </div>
    );
  }
}
