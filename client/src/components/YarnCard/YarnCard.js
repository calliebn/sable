import React from "react";
import "./style.css";

const YarnCard = (props) => {
    return (

        <div className="col-md-4 col-sm-6">
            <div className="card">
                <div className="img-container">
                    <img alt="balls of yarn" src="./assets/yarn.png"></img>
                </div>
                <div className="card=body">
                    <p>Company Name: {props.company}</p>
                    <p>Brand: {props.brand}</p>
                    <p>Colorway: {props.color}</p>
                    <p>Yardage: {props.yardage}</p>
                    <p>Grams: {props.grams}</p>
                    <p>Weight: {props.weight}</p>
                    <p>Skeins: {props.skeins}</p>
                    <p>Dye Lot: {props.dye_lot}</p>
                    <p>Description: {props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default YarnCard;