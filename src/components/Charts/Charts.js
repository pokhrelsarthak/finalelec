import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import DrillDownPieChart1 from './DrillDownPieChart1';


const Charts = () => {

    const [showBackButton, setShowBackButton] = useState(true);
    const handleBack = () => {
        setShowBackButton(true);
    };
    const handleSlice = () => {
        setShowBackButton(false);
    }

    return(
        <>
        <br/>
        {/* {showBackButton && 
            <Link to="/home">
                <button className="btn btn-secondary mx-2">
                    Back
                </button>
            </Link>
        } */}
        <center>
            <br/>
        <div className="pie-chart-container">
        <h1 style={{ color: 'black', padding: '10px',marginTop:'3px' }}>Drilling into Election Data: A Visual Breakdown of Pie Charts</h1>
            <DrillDownPieChart1 handleslice={handleSlice} handleback={handleBack}/>
        </div>
        </center>
        </>
    );
};

export default Charts;

