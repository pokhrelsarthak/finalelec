import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../CSS/Table5.css";
import Range1 from "../Ranges/Range1";
import Range2 from "../Ranges/Range2";
import Range3 from "../Ranges/Range3";
import Range4 from "../Ranges/Range4";
import Range5 from "../Ranges/Range5";
import Range6 from "../Ranges/Range6";
import Reports from "../Reports/Reports";

const Table5 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("1-100");
  const[display,setDisplay] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBack = () => {
    setDisplay(true);
  };

  const handleRangeSelection = (range) => {
    setSelectedRange(range);
    toggleDropdown();
  };

  return (
    <>
      <Link to="/reports">
        <button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
      </Link>
      <div className="range-text">Select Margin Range: </div>
      <Router>
        <div className="dropdown-container">
          <div className="dropdown">
            <button
              className="nav-link btn dropdown-toggle rounded-button"
              id="navbarDropdown"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              {selectedRange ? selectedRange : "Dropdown"}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-right show" aria-labelledby="navbarDropdown">
                  <Link to="/range1">
                <button
                  onClick={() => {handleRangeSelection("1-100");
                                  setDisplay(false);
                                }}
                  className="dropdown-item"
                >
                  <center>1-100</center>
                </button>
                </Link>

                <Link to="/range2">
                <button
                  onClick={() => {handleRangeSelection("100-1000");
                  setDisplay(false);
                }}
                  className="dropdown-item"
                >
                  <center>100-1000</center>
                </button>
                </Link>
                <Link to="/range3">
                <button
                  onClick={() => {handleRangeSelection("1000-10000");
                  setDisplay(false);
                }}
                  className="dropdown-item"
                >
                  <center>1000-10000</center>
                </button>
                </Link>
                <Link to="/range4">
                <button
                  onClick={() => {handleRangeSelection("10000-50000");
                  setDisplay(false);
                }}
                  className="dropdown-item"
                >
                  <center>10000-50000</center>
                </button>
                </Link>
                <Link to="/range5">
                <button
                  onClick={() => {handleRangeSelection("50000-100000");
                  setDisplay(false);
                }}
                  className="dropdown-item"
                >
                  <center>50000-100000</center>
                </button>
                </Link>
                <Link to="/range6">
                <button
                  onClick={() => {handleRangeSelection("100000 and above");
                  setDisplay(false);
                }}
                  className="dropdown-item"
                >
                  <center>100000 and above</center>
                </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {display ? (
          <Range1/>
        ):(<div></div>)}
        <div>
          <Switch>
          <Route path="/reports">
              <Reports />
            </Route>
            <Route path="/range1">
              <Range1 />
            </Route>
            <Route path="/range2">
              <Range2 />
            </Route>
            <Route path="/range3">
              <Range3 />
            </Route>
            <Route path="/range4">
              <Range4 />
            </Route>
            <Route path="/range5">
              <Range5 />
            </Route>
            <Route path="/range6">
              <Range6 />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default Table5;
