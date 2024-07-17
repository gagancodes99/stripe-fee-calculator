
import React, { useEffect, useReducer, useState } from "react";
import "./sass/styles.scss";
import facebookLogo from "./assets/facebook.png";
import twitterLogo from "./assets/twitter.png";
import linkedinLogo from "./assets/linkedin.png";
import redditLogo from "./assets/reddit.png";
import emailLogo from "./assets/email.png";
import pinterestLogo from "./assets/pinterest.png";
import addIcon from "./assets/add_FILL0_wght400_GRAD0_opsz24.svg";
import removeIcon from "./assets/remove_FILL0_wght400_GRAD0_opsz24.svg";
import { ReactComponent as HowItWorks } from "./assets/how-it-works.svg";
import countries from "./db.json"
import NavBar from "./components/NavBar";

const initialState = {
  selected_card: "domestic",
  Country: countries[0].name,
  askAmount: 0.0,
  totalFeeNew: 0.0,
  receiveAmountNew: 0.0,
  receiveAmountOld: 0.0,
  totalFeeOld: 0.0,
  goal: 0.0,
  percent: 0.0,
  fixed: 0.0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_COUNTRY": {

      const selected_country = countries.find((ele) => ele.name === action.payload);
      // console.log(state.selected_card, "**********", selected_country)
      if (state.selected_card == "domestic") {
        return {
          ...state,
          Country: action.payload,
          percent: selected_country.fees?.domestic?.percentage_fee ?? 0,
          fixed: selected_country.fees?.domestic.fixed_fee ?? 0

        }

      } else {
        return {
          ...state,
          Country: action.payload,
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
      // Parse state values as floats
      const goal = parseFloat(state.goal);
      const percent = parseFloat(state.percent);
      const fixed = parseFloat(state.fixed);

      // Check if inputs are valid numbers
      if (isNaN(goal) || isNaN(percent) || isNaN(fixed)) {
        console.error("Invalid input values");
        return state; // Return current state if inputs are invalid
      }

      // Calculate new values
      const divisor = 1 - percent / 100;
      if (divisor === 0) {
        console.error("Division by zero error");
        return state; // Return current state if division by zero would occur
      }

      const askAmount = (goal + fixed) / divisor;
      const totalFeeNew = askAmount * (percent / 100) + fixed;
      const receiveAmountNew = askAmount - totalFeeNew;
      const totalFeeOld = goal * (percent / 100) + fixed;
      const receiveAmountOld = goal - totalFeeOld;

      // Update state with formatted values
      return {
        ...state,
        askAmount: askAmount.toFixed(2),
        totalFeeNew: totalFeeNew.toFixed(2),
        receiveAmountNew: receiveAmountNew.toFixed(2),
        totalFeeOld: totalFeeOld.toFixed(2),
        receiveAmountOld: receiveAmountOld.toFixed(2),
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
  // console.log(state)



  const calculate = () => {

    dispatch({ type: "CALCULATE" })
  };
  const handleCountryChange = (e) => {
    // console.log(e.target.value)
    dispatch({ type: "SELECT_COUNTRY", payload: e.target.value })
  }
  const handleCardChange = (e) => {
    // console.log(state.Country)
    
    dispatch({ type: "SELECT_CARD", payload: e.target.value })
    dispatch({ type: "SELECT_COUNTRY", payload: state.Country })
    // console.log(e.target.value)
  }

  const reset = () => {
    // setState(initialState);
    dispatch({ type: "RESET" })
  };
  useEffect(() => {


  }, [state]);
  useEffect(() => {

dispatch({type:"SELECT_COUNTRY", payload:countries[0].name})
  }, []);


  return (
    <div className="App">
            <NavBar />
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
            <div className="gradient-line"></div>
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
            <div className="gradient-line"></div>
            <p>
              The fee is calculated using the formula: <br />
              <p>Amount to ask: (goal_amount + fixed) / (1 - percent/100)</p>
              <p>Stripe Fee: askAmount * (percent / 100) + fixed</p>
            </p>

            <form
              className="input-cont"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label class="input-group-text">Select country</label>

              <select class="form-select" id="inputGroupSelect01" onChange={(e) => handleCountryChange(e)}>

                {countries?.map((ele) => (
                  <option value={ele.name} key={ele.code}>{ele.name}</option>
                ))}
              </select>
              <label class="input-group-text">Select Card</label>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                <div class="form-check">

                  <input  type="radio" class="btn-check"  name="card" id="exampleRadios1" value="domestic" defaultChecked onChange={(e) => handleCardChange(e)} />
                  <label  class="btn btn-secondary" for="exampleRadios1" >
                    Domestic Card
                  </label>
                </div>

                <div class="form-check">

                  <input cla type="radio" class="btn-check"  name="card" id="exampleRadios2" value="international" onChange={(e) => handleCardChange(e)} />
                  <label  class="btn btn-secondary" for="exampleRadios2" >
                    International Card
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
          <div className="sub-content">
            <div className="calculations">
              <div className="cal">
                <h3>You should ask for</h3>
                <span>{state?.askAmount}</span>
              </div>
              <div className="cal">
                <h3>Stripe fees</h3>
                <span>{state.totalFeeNew}</span>
              </div>
              <div className="cal">
                <h3>You will receive</h3>
                <span>{state.receiveAmountNew}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-faq">
          <div className="content">
            <h2>FAQs</h2>
            <div className="gradient-line"></div>
            <div className="accordion">
              <div className="accordion-item" id="question1">
                <a className="accordion-link" href="#question1">
                  How do I use this calculator?
                  <img src={addIcon} alt="add icon" className="icon-add" />
                  <img src={removeIcon} className="icon-remove" alt="remove icon" />
                </a>
                <div className="answer">
                  <p>
                    Simply enter your goal amount, percentage charge, and fixed
                    charge. Click "Calculate" to see the fee breakdown.
                  </p>
                </div>
              </div>
              <div className="accordion-item" id="question2">
                <a className="accordion-link" href="#question2">
                  How do I use this calculator?
                  <img src={addIcon} className="icon-add" alt="add icon" />
                  <img src={removeIcon} className="icon-remove" alt="remove icon" />
                </a>
                <div className="answer">
                  <p>
                    Simply enter your goal amount, percentage charge, and fixed
                    charge. Click "Calculate" to see the fee breakdown.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-share">
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
        </div>
      </div>
    </div>
  );
};

export default App;

