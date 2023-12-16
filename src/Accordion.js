import React, { useState } from "react";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="faq">
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
      </div>
    </div>
  );
}

export default Accordion();
