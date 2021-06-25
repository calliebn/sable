import React from "react";

function YarnCard(props) {
  return (
    <div className="card">
      <div className="img-container">
      <img alt={props.name} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Company:</strong> {props.company}
          </li>
          <li>
            <strong>Brand:</strong> {props.brand}
          </li>
          <li>
            <strong>Colorway:</strong> {props.colorway}
          </li>
          <li>
            <strong>Yardage:</strong> {props.yardage}
          </li>
          <li>
            <strong>Grams:</strong> {props.grams}
          </li>
          <li>
            <strong>Weight:</strong> {props.weight}
          </li>
          <li>
            <strong>Skeins:</strong> {props.skeins}
          </li>
          <li>
            <strong>Dye Lot:</strong> {props.dyelot}
          </li>
        </ul>       
        <form></form>
      </div>
      <button type= "update">Edit</button>
      <button type = "submit">Save</button>
    </div>
  );
}

export default YarnCard;