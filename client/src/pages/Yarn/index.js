import React from "react";
import YarnCard from "../../components/YarnCard";

function YarnInfo() {
  const yarns= [{name:"fiber"},{name:"aple"}]
  return (
    <div>
      <h1>Yarn</h1>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#yarnModal"
      >
        Launch demo modal
      </button>
      <div className="row">
        {yarns.map((yarn) => (
          <YarnCard
            key={yarn.id}
            image={yarn.image}
            name={yarn.name}
            company={yarn.company}
            brand={yarn.brand}
            colorway={yarn.colorway}
            yardage={yarn.yardage}
            grams={yarn.grams}
            weight={yarn.weight}
            skeins={yarn.skeins}
            dyelot={yarn.dyelot}
          />
        ))}
      </div>
    </div>
  );
}

export default YarnInfo;
