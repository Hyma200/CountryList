import './App.css';
import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {countries, getPath} from './Countries';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      srcCountryCode: 'USA',
      dstCountryCode: '',
      errors: {},
      response: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (countries[this.state.srcCountryCode] === undefined){
      this.setState({
        errors:{
          srcCountryCode: "Invalid Country Code"
        }
      })
    }
    if (countries[this.state.dstCountryCode] === undefined){
      this.setState({
        errors: {
          dstCountryCode: "Invalid Country Code"
        }
      })
    }

    if (countries[this.state.srcCountryCode] !== undefined && countries[this.state.dstCountryCode] !== undefined){
      this.setState({
        errors:{
          srcCountryCode: null,
          dstCountryCode: null
        },
        response: '[' + getPath(this.state.dstCountryCode, this.state.srcCountryCode).toString() + ']'
      })
    }
      
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render(){
    return (
      <div className = 'App'>
        <form style = {{alignItems: 'center'}} noValidate onSubmit ={this.handleSubmit}>
          <Stack spacing={2} direction="row">
            <TextField 
              style = {{width: '25%'}}
              id="srcCountryCode" 
              name = "srcCountryCode" 
              label="Enter Source Country Code" 
              value = {this.state.srcCountryCode}
              onChange = {this.handleChange}
              helperText = {this.state.errors.srcCountryCode}
              error = {this.state.errors.srcCountryCode ? true:false}
              variant="outlined" />
            <TextField 
              style = {{width: '25%'}}
              id="dstCountryCode" 
              name = "dstCountryCode" 
              label="Enter Destination Country Code" 
              value = {this.state.dstCountryCode}
              onChange = {this.handleChange}
              helperText = {this.state.errors.dstCountryCode}
              error = {this.state.errors.dstCountryCode ? true:false}
              variant="outlined" />
            <Button variant="contained" type = "submit">Submit</Button>
          </Stack>
        </form>
        <div className = 'Response'>
          {this.state.response}
        </div>
      </div>
    );
  }
  
}

export default App;
