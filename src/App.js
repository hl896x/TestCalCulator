import React, { Component } from 'react';
import './App.css';
import { Button } from './components/Button';
import { EmptyButton } from './components/EmptyButton';

import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';
import * as math from 'mathjs';
let record;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      history:"",
      calculated:false
    }
  }

  addToInput = val => {
    this.setState({input: this.state.input + val});
    this.setState({history: this.state.history + val});
    console.log('history:',this.state.history);
  }

  

  handleEqual = () => {
      
        this.setState({ input: math.eval(this.state.input) });
        this.setState(
          {
            history: this.state.history + '=,'+math.eval(this.state.input) + ',',
            calculated:true,
          },
          ()=>{
            this.setState({
              input:''
            })
          }
        );
        localStorage.setItem('history', JSON.stringify( this.state.history) );
        this.setState({calculated:false});


  }

  handleMultiply = val => {
    if (val === "x") {
      this.setState({input: this.state.input + val.replace("x", "*")});
      this.setState({history: this.state.history + val});
      console.log('history:',this.state.history);
    }
}
  handlereverse = val => {
    if (val === "+/-") {
      var result = this.state.input*(-1);
      this.setState({input: result});
      this.setState({history: this.state.history + val});
      console.log('history:',this.state.history);
    }
  }
  componentDidMount() {

    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ history: value });
        } catch (e) {
          // handle empty string
          this.setState({history: value });
        }
        console.log('const history:', value);
        console.log('DID history:', this.state.history);
      }
    }


   
    
  }

  render() {
    return (
      <React.Fragment>
        <div className="historySec" style={{color:"white"}} >
          History record
          {}
          {
          record = this.state.history,
          record.split(',').map((e)=>(
            <p style={{textAlign:'right', margin:'0', padding:'0', fontSize:'10px'}}>
              <Input input={e}  ></Input>
            </p>
          ))}
        </div>
        <div className="app">
          
          <div className="calculator-wrapper-science">
          <Input></Input>
            <div className="row">
              <EmptyButton handleEmpty={console.log('empty')} className="scienceGrey">(</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">)</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">mc</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">m+</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">m-</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">mr</EmptyButton>
            </div>
            <div className="row">
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">2<sup>incl</sup></EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">x<sup>2</sup></EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">x<sup>3</sup></EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">x<sup>y</sup></EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">e<sup>x</sup></EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">10<sup>x</sup></EmptyButton>
            </div>
            <div className="row">
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">1/x</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">2√x</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">3√x</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">y√x</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">ln</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">log<sub>10</sub></EmptyButton>
            </div>
            <div className="row">
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">x!</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">sin</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">cos</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">tan</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">e</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">EE</EmptyButton>
            </div>
            <div className="row">
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">Rad</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">sinh</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">cosh</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">tanh</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">π</EmptyButton>
              <EmptyButton handleEmpty={console.log('empty')}  className="scienceGrey">Rand</EmptyButton>
            </div>
          </div>
          <div className="calculator-wrapper">
            <Input input={this.state.input}></Input>
            <div className="row">
              <ClearButton handleClear={() => this.setState({input: "",history:this.state.history+","})}>C</ClearButton>
              <Button className="greyBtn" handleClick={this.handlereverse}>+/-</Button>
              <Button className="greyBtn" handleClick={this.addToInput}>%</Button>
              <Button handleClick={this.addToInput}>/</Button>
            </div>
            <div className="row">
              <Button handleClick={this.addToInput}>7</Button>
              <Button handleClick={this.addToInput}>8</Button>
              <Button handleClick={this.addToInput}>9</Button>
              <Button handleClick={this.handleMultiply}>x</Button>
            </div>
            <div className="row">
              <Button handleClick={this.addToInput}>4</Button>
              <Button handleClick={this.addToInput}>5</Button>
              <Button handleClick={this.addToInput}>6</Button>
              <Button handleClick={this.addToInput}>-</Button>
            </div>
            <div className="row">
              <Button handleClick={this.addToInput}>1</Button>
              <Button handleClick={this.addToInput}>2</Button>
              <Button handleClick={this.addToInput}>3</Button>
              <Button handleClick={this.addToInput}>+</Button>
            </div>
            <div className="row">
              <Button className="lgCircle" handleClick={this.addToInput}>0</Button>
              <Button handleClick={this.addToInput}>.</Button>
              <Button handleClick={
                ()=>{
                  this.handleEqual()
                
                  
                }
                
                
                }>=</Button>
                {console.log("HIS after = empty input:", this.state.history)}
                {console.log("INPut after = empty input:", this.state.input)}
                {console.log("cal after = empty input:", this.state.calculated)}
            </div>
            
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}

export default App;
