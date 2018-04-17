import React, { Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class NotesListDialog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visibleNotes: [],
      moreNotes: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes && nextProps.notes.length > 0) {
      this.setState({ visibleNotes: nextProps.notes.slice(0, 1) })
    }
  }

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

  onPopNote(notes) {
    const visibleNotes = this.state.visibleNotes
    const moreNotes = notes.length > visibleNotes.length + 1
    this.setState({ moreNotes, visibleNotes: notes.slice(0, visibleNotes.length + 1) })
  }

  render() {
    const { notes, onRequestClose, open, box, users } = this.props;
    if (!notes) {
      return <div></div>
    }
    return (
      <Dialog transition={Transition} open={open} onRequestClose={() => onRequestClose()}>
        <DialogTitle>{`Notes inside ${box.name}`}</DialogTitle>
        <DialogContent>
          <List>
            {this.state.visibleNotes.map((note, key) => (
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
        </DialogContent>
        <DialogActions>
          <Button style={{'display': this.state.moreNotes ? 'block' : 'none' }} onClick={this.onPopNote.bind(this, notes)} color="primary">
            Get another note
          </Button>
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
