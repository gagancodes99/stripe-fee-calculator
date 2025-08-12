
import React, { useEffect, useReducer } from "react";
import "./sass/styles.scss";
import { ReactComponent as HowItWorks } from "./assets/how-it-works.svg";
import countries from "./db.json"

const initialCountry = countries[0];
const initialState = {
  selected_card: "domestic",
  country: initialCountry.name,
  askAmount: 0.0,
  totalFeeNew: 0.0,
  receiveAmountNew: 0.0,
  receiveAmountOld: 0.0,
  totalFeeOld: 0.0,
  goal: 0.0,
  percent: initialCountry.fees?.domestic?.percentage_fee ?? 0,
  fixed: initialCountry.fees?.domestic?.fixed_fee ?? 0,
};

const formattedNumber = (num) => Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_COUNTRY": {

      const selected_country = countries.find((ele) => ele.name === action.payload);
      // console.log(state.selected_card, "**********", selected_country)
      if (state.selected_card === "domestic") {
        return {
          ...state,
          country: action.payload,
          percent: selected_country.fees?.domestic?.percentage_fee ?? 0,
          fixed: selected_country.fees?.domestic.fixed_fee ?? 0

        }

      } else {
        return {
          ...state,
          country: action.payload,
          percent: selected_country.fees?.international?.percentage_fee ?? 0,
          fixed: selected_country.fees?.international.fixed_fee ?? 0
        }
      }


    }
    case "SELECT_CARD": {
      // console.log(action.payload);
      return { ...state, selected_card: action.payload }
    }
    case "SET_GOAL": {
      // console.log(action.payload)
      return { ...state, goal: action.payload }
    }
    case "SET_PERCENT": {
      return { ...state, percent: action.payload }
    }
    case "SET_FIXED": {
      return { ...state, fixed: action.payload }
    }
    case "CALCULATE": {
      const goal = parseFloat(state.goal) || 0;
      const percent = parseFloat(state.percent) || 0;
      const fixed = parseFloat(state.fixed) || 0;
    
      if (goal === 0 || percent < 0 || fixed < 0) {
        console.error("Invalid input values");
        return state;
      }
    
      const divisor = 1 - percent / 100;
      if (divisor === 0) {
        console.error("Division by zero error");
        return state;
      }
    
      const askAmount = (goal + fixed) / divisor;
      const totalFeeNew = askAmount * (percent / 100) + fixed;
      const receiveAmountNew = askAmount - totalFeeNew;
      const totalFeeOld = goal * (percent / 100) + fixed;
      const receiveAmountOld = goal - totalFeeOld;
    
      return {
        ...state,
        askAmount: formattedNumber(askAmount),
        totalFeeNew: formattedNumber(totalFeeNew),
        receiveAmountNew: formattedNumber(receiveAmountNew),
        totalFeeOld: formattedNumber(totalFeeOld),
        receiveAmountOld: formattedNumber(receiveAmountOld),
      };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;

  }
}


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log()



  const calculate = () => {
    dispatch({ type: "CALCULATE" })
  };
  const handleCountryChange = (e) => {
    // console.log(e.target.value)
    dispatch({ type: "SELECT_COUNTRY", payload: e.target.value })
  }
  const handleCardChange = (e) => {
    dispatch({ type: "SELECT_CARD", payload: e.target.value });
  };
  

  const reset = () => {
    // setState(initialState);
    dispatch({ type: "RESET" })
  };
  useEffect(() => {
    dispatch({type:"SELECT_COUNTRY", payload:countries[0].name})
  }, []);


  return (
    <div className="App">
      <div className="App-wrapper">
        <div className="header fade-in-up">
          <div className="content">
            <h1>
              <span>Stripe</span> fee calculator
            </h1>
            <p>
              Calculate Stripe processing fees with precision. Get instant insights 
              into transaction costs and optimize your payment strategy with our 
              modern, easy-to-use calculator.
            </p>
          </div>
        </div>

        <div className="section fade-in-up">
          <div className="content">
            <h2>
              <span>How</span> it works
            </h2>
            <p>
              Enter your target amount and select your country to see real-time 
              fee calculations. Our smart calculator automatically applies the 
              correct rates and shows you exactly how much to charge to receive 
              your desired amount.
            </p>
            <HowItWorks className="svg" />
          </div>
        </div>

        <div className="section-fee fade-in-up">
          <div className="content">
            <h2>
              <span>Fee</span> calculation formula
            </h2>
            <p>
              Amount to ask = (goal_amount + fixed_fee) / (1 - percentage_fee/100)
            </p>
            <div className="sub-content">
              <div className="calculations">
                <div className="cal">
                  <h3>Amount to Ask</h3>
                  <span>${state?.askAmount}</span>
                </div>
                <div className="cal">
                  <h3>Stripe Fee</h3>
                  <span>${state.totalFeeNew}</span>
                </div>
                <div className="cal">
                  <h3>You Receive</h3>
                  <span>${state.receiveAmountNew}</span>
                </div>
              </div>
            <form
              className="input-cont"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label>Country</label>
              <select onChange={(e) => handleCountryChange(e)}>
                {countries?.map((ele) => (
                  <option value={ele.name} key={ele.code}>{ele.name}</option>
                ))}
              </select>
              
              <label>Target Amount</label>
              <input
                name="amount"
                placeholder="Enter amount you want to receive"
                type="number"
                step={0.01}
                min={0}
                value={state.goal}
                onChange={(e) =>
                  // setState({ ...state, goal: parseFloat(e.target.value) })
                  dispatch({ type: "SET_GOAL", payload: parseFloat(e.target.value) })
                }
              />
              <label>Processing Fee (%)</label>
              <input
                name="percent"
                placeholder="Percentage fee"
                type="number"
                step={0.01}
                min={0}
                value={state.percent}
                readOnly
              />
              <label>Fixed Fee ($)</label>
              <input
                name="fixed"
                placeholder="Fixed fee amount"
                type="number"
                step={0.01}
                min={0}
                value={state.fixed}
                readOnly
              />
              <button className="calculate" onClick={calculate}>
                Calculate
              </button>
              <button className="reset" onClick={reset}>
                Reset
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

