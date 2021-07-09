import React, {useEffect, useState} from 'react';
// import * as React from 'react';
import axios from 'axios';
import YarnCard from '../../components/YarnCard';

const Yarn = () => {
  
  const yarns= [{name:"fiber"},{name:"aple"}]

  const [fiber, setFiber] = useState(yarns);
  const [companyName, setCompanyName] = useState("");
  const [YarnName, setYarnName] = useState("");
  const handleInputSubmit = async (event) => {
    event.preventDefault();
      console.log("Event", event.target.value, event.target.name);
      const apiURL = "https://api.ravelry.com/yarns/search.json?query=" + companyName;
      console.log(apiURL);
      //CALl API 
      const data = await axios.get(apiURL, {
          headers: {
              Authorization:
                  "cmVhZC00Y2UwNGRjYzRlNWE1NDAzZDEwMzgxN2Y1YzAxOTYyYzowMGI0Y0JPS2dYUGlLdGIvYjFUdHZnekFnZXFkSTViRld4K3RSQThk"
          },
      });
      console.log("API DATA", data);
      setFiber(data.data.yarns);
      console.log("fiber", fiber.length);

    };
    const handleInputChangeName = (event) => setYarnName(event.target.value);
    const handleInputChangeCompany = (event) => setCompanyName(event.target.value);

  return (
        <div className="container">
        <h1>Yarn</h1>
      <form>
        <input onChange={handleInputChangeName} type="text" name="searchName" placeholder="Yarn name"></input>
        <br></br>
        <input onChange={handleInputChangeCompany} type="text" name="searchCompany" placeholder="Company name"></input>
        <br></br>
        <button onClick={handleInputSubmit} type="submit">Search</button>
      </form>
      <div className="row">
        {fiber.map((yarn) => (
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

export default Yarn;
