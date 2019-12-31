import React, { Component } from 'react';
import store, {INCREMENT, DECREMENT,UNDO,REDO} from './store';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //use getState() method to copy the Redux state to the store property.
      store: store.getState()
    }
  }
  componentDidMount(){
    store.subscribe(()=>{
      const reduxState= store.getState();
      this.setState({
        store: reduxState
      })
    })
  }

  handleIncrement=(amount)=>{
    store.dispatch({
      type: INCREMENT,
      amount
    })
  }
  handleDecrement=(amount)=>{
    store.dispatch({
      type: DECREMENT,
      amount
    })
  }
  undo=()=>{
    store.dispatch({
      type:UNDO
    })
  }
  redo=()=>{
    store.dispatch({
      type: REDO
    })
  }

  render() {
    const {currentValue,previousValues,futureValues} = this.state.store;


    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              onClick={() => this.handleIncrement(1)}
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => this.handleIncrement(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() =>this.handleDecrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => this.handleDecrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              disabled={previousValues.length === 0}
              onClick={this.undo}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              disabled={futureValues.length === 0}
              onClick={this.redo}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state.store, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

export default Counter;

{/* JSON.stringify(value[, replacer[, space]]) */}

// value : The value to convert to a JSON string.
// replacer Optional: If this value is null, it'll result JSON string.
// space Optional:  A String or Number object that's used to insert white space. 
//If this is a Number, it indicates the number of space characters to use as white space; this number is capped at 10 (if it is greater, the value is just 10). Values less than 1 indicate that no space should be used.

