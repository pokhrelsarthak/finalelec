import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import "../CSS/Header.css";
import img1 from "../images/img1.png";
import profile from "../images/profile.png"
import Cabinet from "../Cabinet/Cabinet";

const Header = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    window.location.href='/'
  }

  useEffect(() => {
    setMenuOpen(props.render);
  }, [props.render]);
  return (
    <>
      <nav className="header-container" style={{}}>
        <div className="Container center" style={{}}>
          <div className="ui fixed" style={{}}>
            <div className="header-content" style={{}}>
              <div className="logo-heading-container" style={{}}>
                <img style={{marginTop:'5px'}} src={img1} alt="Logo" className="logo" />
                <h2 style={{paddingTop: '20px',position:'relative'}}> Karnataka 2023 Election results</h2>
                {isMenuOpen && 
                  <button onClick={logout} style={{marginLeft: 'auto',position:'absolute',right:'25px',width:'100px'}}>Logout</button>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <nav className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <div className="Container center" style={{ maxWidth: '1200px' }}>
          <div className="ui fixed">
            <div className="header-content">
              <div className="logo-heading-container" style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ marginTop: '5px', width: '50px' }} src={img1} alt="Logo" className="logo" />
                <h2 style={{ paddingTop: '20px', textAlign: 'center', flexGrow: 1, margin: 0 }}>Karnataka 2023 Election results</h2>
                <button style={{ marginLeft: '10px' }}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav> */}




      {isMenuOpen &&(
        <nav>
          <div className="Container center">
          <div className="ui fixed">
            <div id="id1" className="header-content" style={{ display: "flex", justifyContent: "space-around",paddingTop:"10px",paddingBottom:'10px' }}>
              <Link to="/home">
                <button className="btn btn-warning">Home</button>
              </Link>
              <Link to="/charts">
                <button className="btn btn-warning">Charts</button>
              </Link>
              <Link to="reports">
                <button className="btn btn-warning">Reports</button>
              </Link>
              <Link to="cabi">
              <button className="btn btn-warning" style={{ whiteSpace: "nowrap", width: "auto" }}>
                Cabinet Ministers
              </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      )}
    </>
  );
};

export default Header;