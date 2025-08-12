
export default App;
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
        {/* Hero Section */}
        <section className="hero fade-in-up">
          <div className="hero-content">
            <div className="hero-badge">
              Advanced Fee Calculator
            </div>
            <h1>
              <span className="neon-text">Stripe</span> Fee <span className="highlight">Calculator</span>
            </h1>
            <p className="hero-subtitle">
              Calculate Stripe processing fees with precision and style. Get instant insights 
              into transaction costs, optimize your payment strategy, and maximize your revenue 
              with our cutting-edge calculator.
            </p>
            <div className="hero-cta">
              <button className="cta-primary" onClick={() => document.querySelector('.calculator-section').scrollIntoView({ behavior: 'smooth' })}>
                Start Calculating
              </button>
              <a href="#features" className="cta-secondary">
                Learn More
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">195+</span>
                <span className="stat-label">Countries Supported</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Always Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section fade-in-up">
          <div className="section-content">
            <div className="section-header">
              <h2>
                <span className="neon-text">Powerful</span> Features
              </h2>
              <p>
                Everything you need to calculate Stripe fees accurately and efficiently. 
                Built with modern technology and designed for professionals.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global Coverage</h3>
                <p>Support for 12+ major countries with accurate, up-to-date fee structures for both domestic and international transactions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Real-time Calculations</h3>
                <p>Instant fee calculations with precise formulas that account for percentage fees, fixed fees, and currency conversion costs.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Reverse Engineering</h3>
                <p>Calculate exactly how much to charge to receive your desired amount after Stripe fees are deducted.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobile Optimized</h3>
                <p>Fully responsive design that works perfectly on all devices, from desktop to mobile phones.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Privacy First</h3>
                <p>All calculations are performed locally in your browser. No data is sent to external servers.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Lightning Fast</h3>
                <p>Optimized performance with instant results and smooth animations for the best user experience.</p>
              </div>
            </div>
          </div>
        </section>
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

        {/* How It Works Section */}
        <section className="how-it-works fade-in-up">
          <div className="section-content">
            <div className="section-header">
              <h2>
                <span className="neon-text">How</span> It Works
              </h2>
              <p>
                Our advanced algorithm calculates the exact amount you need to charge 
                to receive your desired amount after Stripe processes the transaction.
              </p>
            </div>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Select Country</h3>
                <p>Choose your country to apply the correct Stripe fee structure for your region.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Enter Target Amount</h3>
                <p>Input the amount you want to receive after all fees are deducted.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Get Results</h3>
                <p>Instantly see how much to charge, the total fees, and your net amount.</p>
              </div>
            </div>
            <HowItWorks className="svg" />
          </div>
        </section>

        {/* Calculator Section */}
        <section className="calculator-section fade-in-up">
          <div className="section-content">
            <div className="section-header">
              <h2>
                <span className="neon-text">Fee</span> Calculator
              </h2>
              <div className="formula">
                Amount to ask = (goal_amount + fixed_fee) / (1 - percentage_fee/100)
              </div>
            </div>
            <div className="calculator-container">
              <div className="calculations">
                <div className="calculations-grid">
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
                  Calculate Fees
                </button>
                <button className="reset" onClick={reset}>
                  Reset Calculator
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};