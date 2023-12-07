import React, { Component, useState } from "react";
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

const initialState = {
  askAmount: 0.0,
  totalFeeNew: 0.0,
  receiveAmountNew: 0.0,
  receiveAmountOld: 0.0,
  totalFeeOld: 0.0,
  goal: 0.0,
  percent: 1.75,
  fixed: 0.3,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  calculate = () => {
    let askAmount =
      (this.state.goal + this.state.fixed) / (1 - this.state.percent / 100);
    let totalFeeNew = askAmount * (this.state.percent / 100) + this.state.fixed;
    let receiveAmountNew = askAmount - totalFeeNew;
    let totalFeeOld =
      this.state.goal * (this.state.percent / 100) + this.state.fixed;
    let receiveAmountOld = this.state.goal - totalFeeOld;

    this.setState({
      askAmount: askAmount.toFixed(2) || 0.0,
      totalFeeNew: totalFeeNew.toFixed(2) || 0.0,
      receiveAmountNew: receiveAmountNew.toFixed(2) || 0.0,
      totalFeeOld: totalFeeOld.toFixed(2) || 0.0,
      receiveAmountOld: receiveAmountOld.toFixed(2) || 0.0,
    });
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className="App">
        <div className="App-wrapper">
          <div className="header">
            <div className="content">
              <h1>
                <span>Stripe</span> fee calculator
              </h1>
              <p>
                Welcome to the Stripe Fee Calculator! Easily calculate fees for
                your transactions using Stripe. This calculator helps you
                understand the fees associated with your transactions on Stripe.
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
                Enter your goal amount, the percentage charge, and the fixed
                charge.
                <br /> Click "Calculate" to see the fee breakdown for both old
                and new transactions.
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
                <code>(amount * percent / 100) + fixed</code>.
              </p>

              {/* <div className="form-wrapper"> */}
              <form
                className="input-cont"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label>Enter an invoice amount</label>
                <input
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  step={0.01}
                  min={0}
                  value={this.state.goal}
                  onChange={(e) =>
                    this.setState({ goal: parseFloat(e.target.value) })
                  }
                />
                <label>Percentage Charge</label>
                <input
                  name="percent"
                  placeholder="Percent charge"
                  type="number"
                  step={0.01}
                  min={0}
                  value={this.state.percent}
                  onChange={(e) =>
                    this.setState({ percent: parseFloat(e.target.value) })
                  }
                />
                <label>Fixed Charge</label>
                <input
                  name="fixed"
                  placeholder="Fixed charge"
                  type="number"
                  step={0.01}
                  min={0}
                  value={this.state.fixed}
                  onChange={(e) =>
                    this.setState({ fixed: parseFloat(e.target.value) })
                  }
                />
                <button className="calculate" onClick={this.calculate}>
                  Calculate
                </button>
                <button className="reset" onClick={this.reset}>
                  Reset
                </button>
              </form>
              {/* </div> */}
            </div>
            <div className="sub-content">
              <div className="calculations">
                <div className="cal">
                  <h3>You should ask for</h3>
                  <span>{this.state.askAmount}</span>
                </div>
                <div className="cal">
                  <h3>Stripe fees</h3>
                  <span>{this.state.totalFeeNew}</span>
                </div>
                <div className="cal">
                  <h3>You will receive</h3>
                  <span>{this.state.receiveAmountNew}</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="faq">
            <h2 onClick={() => toggleAccordion(0)}>Question 1</h2>
            <p style={{ display: activeIndex === 0 ? "block" : "none" }}>
              Answer 1
            </p>
          </div>
          <div className="faq">
            <h2 onClick={() => toggleAccordion(1)}>Question 2</h2>
            <p style={{ display: activeIndex === 1 ? "block" : "none" }}>
              Answer 2
            </p>
          </div>
          <div className="faq">
            <h2 onClick={() => toggleAccordion(2)}>Question 3</h2>
            <p style={{ display: activeIndex === 2 ? "block" : "none" }}>
              Answer 3
            </p>
          </div> */}

          <div className="section-faq">
            <div className="content">
              <h2>FAQs</h2>
              <div className="gradient-line"></div>
              {/* Add more FAQs as needed */}
              <div className="accordion">
                <div className="accordion-item" id="question1">
                  <a className="accordion-link" href="#question1">
                    How do I use this calculator?
                    {/* icons */}
                    {/* add  */}
                    <img src={addIcon} alt="add icon" className="icon-add" />
                    {/* remove */}
                    <img
                      src={removeIcon}
                      className="icon-remove"
                      alt="remove icon"
                    />
                  </a>
                  <div className="answer">
                    <p>
                      Simply enter your goal amount, percentage charge, and
                      fixed charge. Click "Calculate" to see the fee breakdown.
                    </p>
                  </div>
                </div>
                <div className="accordion-item" id="question2">
                  <a className="accordion-link" href="#question2">
                    How do I use this calculator?
                    {/* icons */}
                    {/* add  */}
                    <img src={addIcon} className="icon-add" alt="add icon" />
                    {/* remove */}
                    <img
                      src={removeIcon}
                      className="icon-remove"
                      alt="remove icon"
                    />
                  </a>
                  <div className="answer">
                    <p>
                      Simply enter your goal amount, percentage charge, and
                      fixed charge. Click "Calculate" to see the fee breakdown.
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
              {/* Add social media share links */}
              <div className="row-style">
                <div className="share-btn">
                  <img src={facebookLogo} alt="facebook sharing button" />
                </div>
                <div className="share-btn">
                  <img src={twitterLogo} alt="twitter sharing button" />
                </div>
                <div className="share-btn">
                  <img src={pinterestLogo} alt="pinterest sharing button" />
                </div>
                <div className="share-btn">
                  <img src={linkedinLogo} alt="linkedin sharing button" />
                </div>
                <div className="share-btn">
                  <img src={redditLogo} alt="reddit sharing button" />
                </div>
                <div className="share-btn">
                  <img src={emailLogo} alt="email sharing button" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
