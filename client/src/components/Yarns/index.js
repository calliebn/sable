import React from "react";
import "./style.css";
import YarnCard from "../YarnCard/YarnCard";
import yarns from "../../yarns.json";

function YarnInfo() {
    console.log(yarns)
    return (
        <>
            <h1 className="title">Stash</h1>
            <div className="row">
                {yarns.map(yarn => (
                    <YarnCard
                        key={yarn.user_id}
                        company={yarn.company}
                        brand={yarn.brand}
                        colorway={yarn.colorway}
                        yardage={yarn.yardage}
                        grams={yarn.grams}
                        weight={yarn.weight}
                        skeins={yarn.skeins}
                        dye_lot={yarn.dye_lot}
                        description={yarn.description}
                    />

                ))}
            </div>
        </>
    );
}

export default YarnInfo;

