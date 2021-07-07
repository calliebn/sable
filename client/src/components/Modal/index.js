import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import YarnCard from "../../components/YarnCard";
function YarnInfo() {
    const [fiber, setFiber] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const handleInputChange = (event) => {
        console.log("Event", event.target.value, event.target.name);
        const apiURL = "https://api.ravelry.com/yarns/search.json?query=" + event.target.value;
        console.log(apiURL);
        //CALl API 
        const data = axios.get(apiURL, {
            headers: {
                Authorization:
                    "cmVhZC00Y2UwNGRjYzRlNWE1NDAzZDEwMzgxN2Y1YzAxOTYyYzowMGI0Y0JPS2dYUGlLdGIvYjFUdHZnekFnZXFkSTViRld4K3RSQThk"
            },
        });
        console.log("API DATA", data);
        setFiber(data);
        console.log("fiber", fiber.length);
    };

  return (
      //colorway has to be a text area

    // <div>
    //     {fiber.yarns[0].yarn_company_name}
    // </div>
    <div
      class="modal fade"
      id="yarnModal"
      tabindex="-1"
      aria-labelledby="yarnModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="yarnModalLabel">
              Add a yarn
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              <>
                            Search for Yarn :
                            <label for="company">Company Name:<input name="companyName" onChange={handleInputChange} /></label>
                            <label for="brand">Brand:<input name="brandName" onChange={handleInputChange} /></label>
                        </>
            ></button>
          </div>
          <div class="modal-body">
              <form>
              <div class="form-group">
            <label for="image">{fiber.yarns[].first_photo.square_url}</label>
            <label for="company">Company Name:{fiber.yarns[0].yarn_company_name}</label>
            <label for="brand">Brand:{fiber.yarns[].name}</label>
            <label for="colorway">Colorway:<input type="input" name="colorway" id="colorway" value=""/></label>
            <label for="yardage">Yardage:{fiber.yarns[].yardage}</label>
            <label for="grams">Grams:{fiber.yarns[].grams}</label>
            <label for="weight">Weight: {fiber.yarns[].yarn.weight.name}</label>
            <label for="skeins">Skeins:<input type="input" name="skeins" id="skeins" value=""/></label>
            <label for="dyelot">Dye_lot:<input type="input" name="dye_lot" id="dye_lot" value=""/></label>
            <label for="description">Description:<input type="input" name="description" id="description" value=""/></label>
            </div>
            </form>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
