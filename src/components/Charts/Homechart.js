// import "./styles.css";
import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";
import axios from "axios";

// const data = [];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
        shortform
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>

            <text x={cx} y={cy+17} dy={8} textAnchor="middle" fill={fill}>
                {`(`+shortform+`)`}
            </text>

            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 20}
                fill={fill}
            />

            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />

            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`${value} WON`}</text>

            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>

        </g>
    );
};

export default function Homechart() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [datas, setDatas] = useState([]);
    
    useEffect(() => {
        fetchData2();
      }, []);

    const fetchData2 = () => {
        axios.get(`http://18.119.86.132:8080/electionfinal/election/woncount`)
            .then((response) => {
                // console.log('Axios response:', response.data);
                const ranges3 = [];
                const max = [];
                const k = response.data;
                for (var i of k) {
                    max.push(Number(i.count));
                }
                max.sort((a, b) => b - a);
                console.log(max);
                let otherpname = "";
                let othervotcnt = 0;
                for (var i of k) {
                    if ((i.count == max[0]) || (i.count == max[1]) || (i.count == max[2])){
                        const rangeName = i.pname;
                        const valuee = Number(i.count);
                        if (rangeName === "Bharatiya Janata Party"){
                            ranges3.push({
                                name: rangeName.toUpperCase(),
                                value: valuee,
                                fill: '#FF9933',
                                shortform:'BJP'
                            });
                        }
                        else if (rangeName === "Indian National Congress"){
                            ranges3.push({
                                name: rangeName.toUpperCase(),
                                value: valuee,
                                fill: '#1560BD',
                                shortform:'INC'
                            });
                        }
                        else if (rangeName === "Janata Dal  (Secular)"){
                            ranges3.push({
                                name: rangeName.toUpperCase(),
                                value: valuee,
                                fill: '#006400',
                                shortform:'JD(S)'
                            });
                        }
                    }
                    else{
                        otherpname = otherpname +" ,"+ i.pname;
                        othervotcnt = othervotcnt + Number(i.count);
                    }
                }
                ranges3.push({
                        name: 'OTHERS',
                        value: othervotcnt,
                        fill: '#800080',
                        shortform: '3 parties'
                    });

                // console.log(ranges3);
                setDatas(ranges3);
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    }

    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <PieChart width={800} height={600}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={datas}
                cx={400}
                cy={200}
                innerRadius={120}
                outerRadius={170}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
        </PieChart>
    );
}
