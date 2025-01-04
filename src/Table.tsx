import perJson from "../periodicTable.json";

function Row({index, updateNum} : {index:number, updateNum:Function}){
    let boxes: [number, number][] = [];
    for(let i = 0; i < 18; i++){
        boxes.push([setElementData((index * 18) + i), i]);
    }
    return (
        <div className="subDiv">
            {boxes.map((i) => (
                <Box key={i[1]} index={i[0]} updateNum={updateNum} />
            ))}
        </div>
    )
}
function Box({index, updateNum} : {index:number, updateNum: Function}){
    // takes a number, either an element or -1 for nothing
    const elements = perJson["table"];
    return (
        <div className="element" id={setElementDataToString(index)} onClick={() => updateNum(index)}>
            <p className="numOfEl">{index}</p>
            {index != -1 && <p className="elSymb">{elements[index - 1].symbol}</p>}
            
        </div>
    )
}

export default function Table({updateNum} : {updateNum: Function}){
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className="mainDiv">
            {rows.map((i) => (
                <Row key={i} index={i} updateNum={updateNum} />
            ))}
        </div>
    )
}


function setElementData(num: number): number{
    if(num == 0) return 1; // hydrogen
    if(num > 0 && num < 17) return -1;
    num -= 15; 
    if(num <= 4) return num;// 2 - 4
    if(num > 4 && num < 15) return -1;
    num -= 10;
    if(num <= 12) return num; // 5-12
    if(num > 12 && num < 23) return -1;
    num -= 10;
    if(num > 57) num += 14;// exerpt for the bottom blocks
    if(num > 89) num += 14;
    if(num > 118 && num < 121) return -1;
    if(num > 134 && num < 139) return -1;
    if(num > 152) return -1;
    if(num > 137) num += 14;
    if(num > 118) num -= 63;
    return num;
}
function setElementDataToString(num: number): string{
    if(num == -1) return "nonExistant";
    // will return the group name
    num = num - 1;
    let str = perJson["table"][num].category;

    switch (str) {
        case 'polyatomic nonmetal':
        case 'diatomic nonmetal':
            return 'nonmetal';
        default:
            if(str.startsWith("unknown")) return 'unknown';
            str = str.replace(/ /g, '-');
            return str;
    }
}
