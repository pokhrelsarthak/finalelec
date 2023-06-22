import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import "../CSS/Header.css";
import Homechart from '../Charts/Homechart';
function Home(props) {
  // const [isMenuOpen, setMenuOpen] = useState(true);

  // useEffect(() => {
  //   setMenuOpen(props.render);
  // }, [props.render]);

  return (
    <div>
      {/* {isMenuOpen &&(
        <nav>
          <div className="Container center">
          <div className="ui fixed">
            <div id="id1" className="header-content" style={{ display: "flex", justifyContent: "space-around",paddingTop:"10px",paddingBottom:'10px' }}>
              <Link to="home">
                <button className="btn btn-warning">Home</button>
              </Link>
              <Link to="charts">
                <button className="btn btn-warning">Charts</button>
              </Link>
              <Link to="reports">
                <button className="btn btn-warning">Reports</button>
              </Link>
              <button className="btn btn-warning" style={{ whiteSpace: "nowrap", width: "auto" }}>
                Cabinet Ministers
              </button>
            </div>
          </div>
        </div>
      </nav>
      )} */}

      <div>
        <h2 style={{marginTop:'20px',textAlign:'center',fontWeight:'bold'}}>Party wise trends (224/224)</h2>
      </div>
      <center>
        <Homechart />
      </center>
    </div>
  );
}

export default Home;

