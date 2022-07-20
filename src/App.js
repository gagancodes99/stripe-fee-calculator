import { Component} from 'react';
import './App.css';

const initialState = {
  askAmount:0.00,
  totalFeeNew:0.00,
  receiveAmountNew:0.00,
  receiveAmountOld:0.00,
  totalFeeOld:0.00,
  goal:0.00,
  percent:1.75,
  fixed:0.30
}
class App extends Component {
  constructor(props){
    super(props)
    this.state = initialState
  }

  calculate = () => {
    // console.log(this.state)
    let askAmount = (this.state.goal + this.state.fixed ) / (1 - (this.state.percent/100))
    console.log('To ask: '+askAmount)
    let totalFeeNew = (askAmount*(this.state.percent/100))+this.state.fixed
    console.log('New Total Fee: '+totalFeeNew)
    let receiveAmountNew = askAmount - totalFeeNew
    console.log('New Receive amount: '+receiveAmountNew)

    let totalFeeOld = (this.state.goal*(this.state.percent/100))+this.state.fixed
    console.log('Old Total Fee: '+totalFeeOld)
    let receiveAmountOld = this.state.goal - totalFeeOld
    console.log('Old Receive amount: '+receiveAmountOld)

    this.setState({
      askAmount:askAmount.toFixed(2),
      totalFeeNew:totalFeeNew.toFixed(2),
      receiveAmountNew:receiveAmountNew.toFixed(2),
      totalFeeOld:totalFeeOld.toFixed(2),
      receiveAmountOld:receiveAmountOld.toFixed(2)
    })
  }
  reset = () => {
    this.setState(initialState)
  }
  render(){
    return (
      <div className="App">
        <div className="App-header">
            <form className="inpt-cont" onSubmit={(e)=>{e.preventDefault()}}>
              <label>Goal Amount</label>
              <input 
              name='amount' 
              placeholder='Amount'
              type='number'
              step={0.01}
              min={0}
              value={this.state.goal}
              onChange={(e)=>this.setState({goal:parseFloat(e.target.value)})}/>
              <label>Percentage Charge</label>
              <input 
              name='percent' 
              placeholder='Percent charge'
              type='number'
              step={0.01}
              min={0}
              value={this.state.percent}
              onChange={(e)=>this.setState({percent:parseFloat(e.target.value)})}/>
              <label>Fixed Charge</label>
              <input 
              name='fixed' 
              placeholder='Fixed charge'
              type='number'
              step={0.01}
              min={0}
              value={this.state.fixed}
              onChange={(e)=>this.setState({fixed:parseFloat(e.target.value)})}/>
             <button className="calculate" onClick={this.calculate}>
               Calculate
             </button>
             <button className="reset" onClick={this.reset}>
               Reset
             </button>
              <div className="text-cont">
                <div className="text-1">
                  <p>Old Amount: {this.state.goal}</p>
                  <p>Total Fee: {this.state.totalFeeOld}</p>
                  <p>You will receive: {this.state.receiveAmountOld}</p>
                </div>
                <div className="line"></div>
                <div className="text-1">
                  <p>You should ask for: {this.state.askAmount}</p>
                  <p>Total Fee: {this.state.totalFeeNew}</p>
                  <p>You will receive: {this.state.receiveAmountNew}</p>
                </div>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

export default App;
