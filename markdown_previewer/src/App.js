import React from 'react';
import './App.css'
import Previewer from './Previewer';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }

    this.changeTextArea = this.changeTextArea.bind(this);
  }

  changeTextArea(event){
    console.log(event.target.value)
    this.setState({text: event.target.value});
    return event.target.value;
  }

  render(){
    return (
    <div className="App">
      <div className= 'editor'>
         <div className="bar">
            Editor
          </div>
          <textarea onChange={this.changeTextArea} value={this.state.text}>

        </textarea>
      </div>
      <Previewer text = {this.state.text}/>
    </div>
  );
  }

}

export default App;
