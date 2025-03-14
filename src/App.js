
import React, { useEffect, useReducer } from "react";
import "./sass/styles.scss";
import facebookLogo from "./assets/facebook.png";
import twitterLogo from "./assets/twitter.png";
import linkedinLogo from "./assets/linkedin.png";
import redditLogo from "./assets/reddit.png";
import emailLogo from "./assets/email.png";
import pinterestLogo from "./assets/pinterest.png";
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
        <div className="header">
          <div className="content">
            <h1>
              <span>Stripe</span> fee calculator
            </h1>
            <p>
              Welcome to the Stripe Fee Calculator! This tool empowers you to
              effortlessly calculate fees associated with your transactions on
              Stripe. Whether you're a business owner, freelancer, or anyone
              using Stripe for payment processing, this calculator helps you
              gain insights into the fees for your transactions. Let's explore
              how it works and how you can make the most of it.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="content">
            <h2>
              <span>How</span> it works
            </h2>
            <p>
              To get started, simply enter your goal amount, the percentage
              charge, and the fixed charge in the form below. Click "Calculate"
              to see a detailed breakdown of fees for both old and new
              transactions. The visual representation explains the process step
              by step, making it easy for you to understand and optimize your
              transactions.
            </p>
            <HowItWorks className="svg" />
          </div>
        </div>

        <div className="section-fee">
          <div className="content">
            <h2>
              <span>Fee</span> calculation formula
            </h2>
            <div>
            <p>
              The fee is calculated using the formula: <br />  </p>
              <p>Amount to ask: (goal_amount + fixed) / (1 - percent/100)</p>
              <p>Stripe Fee: askAmount * (percent / 100) + fixed</p>
           
            </div>
            <div className="sub-content">
            <div className="calculations">
              <div className="cal">
                <h3>Ask</h3>
                <span>{state?.askAmount}</span>
              </div>
              <div className="cal">
                <h3>Fee</h3>
                <span>{state.totalFeeNew}</span>
              </div>
              <div className="cal">
                <h3>Receive</h3>
                <span>{state.receiveAmountNew}</span>
              </div>
            </div>
          </div>
            <form
              className="input-cont"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label className="input-group-text">Select country</label>

              <select className="form-select" id="inputGroupSelect01" onChange={(e) => handleCountryChange(e)}>

                {countries?.map((ele) => (
                  <option value={ele.name} key={ele.code}>{ele.name}</option>
                ))}
              </select>
              {/* <label className="input-group-text">Select Card</label>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                <div className="form-check">

                  <input  type="radio" className="btn-check"  name="card" id="exampleRadios1" value="domestic" defaultChecked onChange={(e) => handleCardChange(e)} />
                  <label  className="btn btn-secondary" htmlFor="exampleRadios1" >
                    Domestic
                  </label>
                </div>

                <div className="form-check">

                  <input  type="radio" className="btn-check"  name="card" id="exampleRadios2" value="international" onChange={(e) => handleCardChange(e)} />
                  <label  className="btn btn-secondary" htmlFor="exampleRadios2" >
                    International
                  </label>
              
                </div>
                
              </div> */}



              <label>Enter an invoice amount</label>
              <input
                name="amount"
                placeholder="Amount"
                type="number"
                step={0.01}
                min={0}
                value={state.goal}
                onChange={(e) =>
                  // setState({ ...state, goal: parseFloat(e.target.value) })
                  dispatch({ type: "SET_GOAL", payload: parseFloat(e.target.value) })
                }
              />
              <label>Percentage Charge</label>
              <input
                name="percent"
                placeholder="Percent charge"
                type="number"
                step={0.01}
                min={0}
                value={state.percent}
                readOnly
              // onChange={(e) =>
              //   // setState({ ...state, percent: parseFloat(e.target.value) })
              //   dispatch({ type: "SET_PERCENT", payload: parseFloat(e.target.value) })
              // }
              />
              <label>Fixed Charge</label>
              <input
                name="fixed"
                placeholder="Fixed charge"
                type="number"
                step={0.01}
                min={0}
                value={state.fixed}
                readOnly
              // onChange={(e) =>
              //   // setState({ ...state, fixed: parseFloat(e.target.value) })
              //   dispatch({ type: "SET_FIXED", payload: parseFloat(e.target.value) })
              // }
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

       

        {/* <div className="section-share">
          <div className="content">
            <h2>
              <span>Share</span> this page
            </h2>
            <div className="gradient-line"></div>
            <div className="row-style">
              <a href="#" className="share-btn">
                <img src={facebookLogo} alt="facebook sharing button" />
              </a>
              <a href="#" className="share-btn">
                <img src={twitterLogo} alt="twitter sharing button" />
              </a>
              <a className="share-btn">
                <img src={pinterestLogo} alt="pinterest sharing button" />
              </a>
              <a href="#" className="share-btn">
                <img src={linkedinLogo} alt="linkedin sharing button" />
              </a>
              <a href="#" className="share-btn">
                <img src={redditLogo} alt="reddit sharing button" />
              </a>
              <a href="#" className="share-btn">
                <img src={emailLogo} alt="email sharing button" />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default App;

