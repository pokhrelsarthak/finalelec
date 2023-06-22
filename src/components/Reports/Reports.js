import React from "react";
import { Link } from 'react-router-dom';
const Reports = () => {

    return(
        <>
        {/* <Link to="/home">
            <button className="btn btn-secondary mx-2">
                Back
            </button>
        </Link> */}
        <center>
         <h2 style={{marginTop:'30px'}}>Reports</h2>
         <div >
            <Link to="/table1">
            <button className="btn btn-dark" style={{ width: '50%', whiteSpace: 'normal', background: 'pink', color: 'black' }}>
            Top-5 Candidates won with the highest margin in their Constituency
            </button>
            </ Link>
            <br/>
            <br/>
            <Link to="/table2">
            <button className="btn btn-dark" style={{ width: '50%', whiteSpace: 'normal', backgroundColor: 'pink',color: 'black' }}>
            Top-5 Candidates with highest votes
            </button>
            </Link>
            <br/>
            <br />
            <Link to="/table3">
            <button className="btn btn-dark" style={{ width: '50%', whiteSpace: 'normal' ,backgroundColor: 'pink',color: 'black'}}>
                Candidates contesting in more than one constituency
            </button>
            </Link>
            <br/>
            <br/>
            <Link to="/table4">
            <button className="btn btn-dark" style={{ width: '50%', whiteSpace: 'normal',backgroundColor: 'pink',color: 'black' }}>
                Top-5 Constituencies with highest NOTA votes
            </button>
            </Link>
            <br/>
            <br/>
            <Link to="/table5">
            <button className="btn btn-dark" style={{ width: '50%', whiteSpace: 'normal' ,background: 'pink',color: 'black'}}>
                Constituency won with margin Ranges
            </button>
            </Link>
         </div>
        </center>
        </>
    )
}
export default Reports;