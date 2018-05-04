import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { insertNote, fetchBoxes } from './actions';

class InsertNotesForm extends Component {

  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onNoteTitleChange = this.onNoteTitleChange.bind(this);
    this.onNoteDetailChange = this.onNoteDetailChange.bind(this);
    this.onNoteAnonymousChange = this.onNoteAnonymousChange.bind(this);
    this.state = {
      title: '',
      detail: '',
      anonymous: false
    }
  }

  onSubmit(event){
    event.preventDefault();

    this.props.insertNote(this.props.box, this.state, () => this.props.fetchBoxes())
    this.setState({title: '', detail: '', anonymous: false})
  }

  onNoteTitleChange(event){
    this.setState({title: event.target.value, detail: this.state.detail, anonymous: this.state.anonymous})
  }

  onNoteDetailChange(event){
    this.setState({title: this.state.title, detail: event.target.value, anonymous: this.state.anonymous})
  }

  onNoteAnonymousChange(event){
    this.setState({title: this.state.title, detail: this.state.detail, anonymous: !this.state.anonymous})
  }

  render(){
    return (
      <div className="notes-section">
        <h3>Insert a note!</h3>
        <form onSubmit={this.onSubmit} className="form-inline">
          <div className="form-group">
            <label htmlFor="note-title">Title:</label>
            <input
              onChange={this.onNoteTitleChange}
              type="text"
              className="form-control"
              id="note-title"
              value={this.state.title} />
          </div>
          <div className="form-group">
            <label htmlFor="note-detail">Detail:</label>
            <input
              type="text"
              className="form-control"
              id="note-detail"
              onChange={this.onNoteDetailChange}
              value={this.state.detail}
          />
          </div>
          <div className="form-group">
            <label htmlFor="openDate">Anonymous:</label>
            <input
              type="checkbox"
              className="form-control"
              id="openDate"
              onChange={this.onNoteAnonymousChange}
              checked={this.state.anonymous}
            />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ insertNote, fetchBoxes }, dispatch);
}

function mapStateToProps(state){
  return {
    box: state.selectedBox
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertNotesForm)
