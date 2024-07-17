import React, { useEffect, useReducer, useState } from 'react'
import NavBar from '../components/NavBar'



const initialState = {
  Tax_Behaviour:"inclusive",
  Tax_Percentage:0,
  amount: 0,
  // inclusiveTaxPercentage:"",
  // exclusiveTaxPercentage:""
  taxResult:""
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PERCENT_RANGE':
      // console.log(action.payload)
      return { ...state, Tax_Percentage: action.payload }
    case "SET_AMOUNT": {
      // console.log(action.payload)
      return { ...state, amount: action.payload }
    }
    case "SET_TAX_BEHAVIOUR": {
      // console.log(action.payload)
      return {...state, Tax_Behaviour:action.payload }
    }
    case "RESET":{
    return {...state,taxResult:""}
    }
    case "CALCULATE": {
      // console.log(state.Tax_Percentage)
      if(state.Tax_Behaviour=="inclusive"){
        const inclusiveTax = Number(state.amount - (state.amount / (1 + (state.Tax_Percentage / 100)))).toFixed(2);
      return {
        ...state, taxResult: inclusiveTax
      }
        
      }else{
        const exclusiveTax = Number(state.amount * (state.Tax_Percentage / 100)).toFixed(2);
        return {
          ...state, taxResult:exclusiveTax
        }
          }
     
    }
    default:
      return state
  }
}



function TaxCalculator() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleCardChange = (e) => { 
    // console.log(e.target.value)
    dispatch({type:"SET_TAX_BEHAVIOUR", payload:e.target.value})

    dispatch({type:"RESET"})
  }

  const calculate = () => {
    dispatch({type:"CALCULATE",})
   }

useEffect(()=>{

},[state])



  return (
    <div>
      <NavBar />
      <div className="section-fee">
        <div className="content">
          <h2>
            <span>Tax</span> Calculation
          </h2>
          <div className="gradient-line"></div>
          <p>
            The inclusive tax is calculated using the formula:  <span style={{color:"#8A2BE2",fontWeight:'bold'}}>Inclusive</span> <br />
            <p>totalAmount * tax_percentage / 100 + tax_percentage  </p>
            
          </p>
          <br />
          <p>
            The exclusive tax is calculated using the formula:  <span style={{color:"#8A2BE2",fontWeight:'bold'}}>Exclusive</span> <br />
            <p>totalAmount * tax_percentage / 100 </p>
            
          </p>

          <form
            className="input-cont"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >



            <label class="input-group-text">Select tax behaviour</label>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
              <div class="form-check">

                <input type="radio" class="btn-check" name="card" id="Radios1" value="inclusive" defaultChecked onChange={(e) => handleCardChange(e)} />
                <label class="btn btn-secondary" for="Radios1" >
                  Inclusive
                </label>
              </div>

              <div class="form-check">

                <input cla type="radio" class="btn-check" name="card" id="Radios2" value="exclusive" onChange={(e) => handleCardChange(e)} />
                <label class="btn btn-secondary" for="Radios2" >
                  Exclusive
                </label>

              </div>

            </div>



            <label>Enter an invoice amount</label>
            <input
              name="amount"
              placeholder="Amount"
              type="number"
              step={0.01}
              min={0}
              value={state.amount}
              onChange={(e) =>

                dispatch({ type: "SET_AMOUNT", payload: parseFloat(e.target.value) })
              }
            />
            <label> Tax {state.Tax_Percentage}%</label>
            <input 
              name="percent"
              placeholder="Percent charge"
              type="range"
              min={0}
              step={0.1}
              max={100}
              value={state.Tax_Percentage}
              onChange={(e) =>
                dispatch({ type: "SET_PERCENT_RANGE", payload: parseFloat(e.target.value) })
              }
               />


            <button className="calculate" onClick={calculate}>
              Calculate
            </button>
           
          </form>
        </div>
        <div className="sub-content">
            <div className="calculations">
              <div className="cal flex">
                <h3>{state.Tax_Behaviour=="inclusive"?"Inclusive": "Exclusive"}</h3>
                <span> ${state.amount} has {state.Tax_Behaviour} tax of  ${state.taxResult} </span>
              </div>
             
            </div>
          </div>
      </div>
    </div>
  )
}

export default TaxCalculator
