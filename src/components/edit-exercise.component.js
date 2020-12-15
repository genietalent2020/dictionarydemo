import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeWord_key = this.onChangeWord_key.bind(this);
    this.onChangeDefinition = this.onChangeDefinition.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      word_key: '',
      definition: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          word_key: response.data.word_key,
          definition: response.data.definition,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeWord_key(e) {
    this.setState({
      word_key: e.target.value
    })
  }

  onChangeDefinition(e) {
    this.setState({
      definition: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      word_key: this.state.word_key,
      definition: this.state.definition,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Word Definition</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Word_key: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.word_key}
              onChange={this.onChangeWord_key}
              />
        </div>
        <div className="form-group">
          <label>Definition: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.definition}
              onChange={this.onChangeDefinition}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Word Definition" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}