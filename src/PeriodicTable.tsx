import Table from "./Table"
import BigElement from "./BigEl"
import { useState } from "react";

export const PeriodicTable = () => {
    const [num, setNum] = useState(0);
    function updateNum(n: number){
        setNum(n);
    }
    return (
        <div className="mainDiv">
            <Table updateNum={updateNum}/>
            <BigElement num={num}/>
        </div>
    );
};
