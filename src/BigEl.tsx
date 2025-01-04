import perJson from "../periodicTable.json";

export default function BigElement({num} : {num:number}){
    if(num <= 0) return(<div />)
    const element = perJson["table"][num - 1];
    return (
        <div className="dataDiv">
            <div className="bigElement" id={setElementDataToString(num)}>
                <div className="numberAndMass">
                    <p className="number">{element.number}</p>
                    <p className="mass">{element.atomicMass.toString().substring(0, 10)}</p>
                </div>
                <h1 className="symbol">{element.symbol}</h1>
                <div className="name">{element.name}</div>
            </div>
            <div className="category attrib">Category: {element.category}</div>
            <div className="electron-config attrib">Electron configuration:<br />{element.electronConfig}</div>
            <div className="group attrib">Group: {element.group}</div>
            <div className="period attrib">Period: {element.period}</div>
            <div className="valence attrib">Number of valence electrons: {findValenceElectrons(num)}</div>
            <div className="oxidationStates attrib">Oxidation states: {element.oxidationStates}</div>
            <div className="atomicRadius attrib">Atomic radius: {element.atomicRadius}</div>
            <div className="phase attrib">Phase: {element.phase}</div>
        </div>
    )
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
function findValenceElectrons(num: number): number{
    num -= 1;
    const group = perJson["table"][num].group;
    if(group < 3) return group;
    if(group > 12) return group % 10;

    // transition metals
    const electronConfigString = perJson["table"][num].electronConfig
    const electronConfigArr = electronConfigString.split(" ");
    let maxOrbit = 0;
    for(let i = 0; i < electronConfigArr.length; i++){
        if(parseInt(electronConfigArr[i].charAt(0)) > maxOrbit){
            maxOrbit = i;
        }
    }
    return parseInt(electronConfigArr[maxOrbit].charAt(2));
}
