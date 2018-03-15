import React, { Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';




class NotesListDialog extends Component {
  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  getAvatar(user, users) {
    if (!user || !users[user].username || ! users[user].imageUrl) {
      return (
        <Avatar>
          <PersonIcon />
        </Avatar>
      )
    } else {
      return <Avatar src={users[user].imageUrl}></Avatar>
    }
  }

  render() {
    const { notes, onRequestClose, open, box, users } = this.props;
    if (!notes) {
      return <div></div>
    }
    return (
      <Dialog open={open} onRequestClose={() => onRequestClose()}>
        <DialogTitle>{`Notes inside ${box.name}`}</DialogTitle>
        <div>
          <List>
            {notes.map((note, key) => (
              <ListItem key={note.title + key}>
                <ListItemAvatar>
                  <Tooltip
                    title={!note.from ? "Anonymous":  users[note.from].username || `Unknow user, id: ${note.from}`}
                    placement="top">
                    {this.getAvatar(note.from, users)}
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  primary={note.title}
                  secondary={note.detail}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <DialogActions>
          <Button onClick={() => onRequestClose()} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    users: state.users,
    box: state.selectedBox
  }
}

export default connect(mapStateToProps)(NotesListDialog);
