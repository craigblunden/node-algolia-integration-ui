import React, { Component } from 'react';
import axios from 'axios'

import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

class App extends Component {

  state = {
    data: [],
    netoWebsiteURL: '',
    netoAPIUsername: '',
    netoAPIKey: '',
    algoliaAppID: '',
    algoliaAPIKey: '',
    algoliaIndex: '',
  }
  
  fetchData() {
    // Make a request for a user with a given ID
    let that = this
    axios.post('/api/send', {
      netoWebsiteURL: this.state.netoWebsiteURL,
      netoAPIUsername: this.state.netoAPIUsername,
      netoAPIKey: this.state.netoAPIKey,
      algoliaAppID: this.state.algoliaAppID,
      algoliaAPIKey: this.state.algoliaAPIKey,
      algoliaIndex: this.state.algoliaIndex,
    })
    .then(function (response) {
      that.setState({
        data: response.data,
        websiteURL: ''
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  handleChange(e){
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <label>netoWebsiteURL</label>
          <input type="text" name="netoWebsiteURL" onChange={(e) => this.handleChange(e)} value={this.state.netoWebsiteURL}/>
          <br />
          <label>netoAPIUsername</label>
          <input type="text" name="netoAPIUsername" onChange={(e) => this.handleChange(e)} value={this.state.netoAPIUsername}/>
          <br />
          <label>netoAPIKey</label>
          <input type="text" name="netoAPIKey" onChange={(e) => this.handleChange(e)} value={this.state.netoAPIKey}/>
          <br />
          <label>algoliaAppID</label>
          <input type="text" name="algoliaAppID" onChange={(e) => this.handleChange(e)} value={this.state.algoliaAppID}/>
          <br />
          <label>algoliaAPIKey</label>
          <input type="text" name="algoliaAPIKey" onChange={(e) => this.handleChange(e)} value={this.state.algoliaAPIKey}/>
          <br />
          <label>algoliaIndex</label>
          <input type="text" name="algoliaIndex" onChange={(e) => this.handleChange(e)} value={this.state.algoliaIndex}/>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <ul>
        {
          this.state.data.map(itm => <li key={itm.objectID}>{itm.Name}</li>)
        }
        </ul>
      </div>
    );
  }
}

export default App;
