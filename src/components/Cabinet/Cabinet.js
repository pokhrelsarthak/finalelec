import React, { useState,useEffect } from 'react'
import axios from 'axios';
export default function Cabinet() {
    const [arr, setArr] = useState([]);
    useEffect(() => {
        fetchDatas();
      }, []);
    const fetchDatas = () =>  {
        axios.get(`http://localhost:8080/cabinet/ministers`)
        .then((response) => {
            const k = response.data;
            setArr(k);
        });

        }
        const table2Style = {
            borderCollapse: 'collapse',
            width: '80%', // Adjust the width here
            height: '100px', // Adjust the height here
          };
        
          const table2HeaderStyle = {
            border: '1px solid black',
            padding: '8px',
            backgroundColor: '#f2f2f2',
            textAlign: 'center',
          };
        
          const table2CellStyle = {
            border: '1px solid black',
            padding: '8px',
            textAlign: 'center',
          };
    return (
        <div style={{marginTop:'25px'}}>
            <center>
                <h1>Cabinet Ministers of Karnataka</h1>
            <table style={table2Style}>
                <thead>
                <tr>
                    <th style={table2HeaderStyle}>Sno</th>
                    <th style={table2HeaderStyle}>Minister Name</th>
                    <th style={table2HeaderStyle}>Portfolios</th>
                </tr>
                </thead>
                <tbody>
                {arr.map((data,index) => (
                    <tr key={data.sno}>
                    <td style={table2CellStyle}>{index+1}</td>

                    {/* {data.ministername == 'Sri SIDDARAMAIAHChief Minister' ?
                    (<td style={table2CellStyle}>Sri SIDDARAMAIAH (Chief Minister)</td>):
                    (<td style={table2CellStyle}>{data.ministername}</td>)} */}
                    
                    <td style={table2CellStyle}>{data.ministername}</td>
                    <td style={table2CellStyle}>{data.portfolio}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </center>
        </div>
    )
}
