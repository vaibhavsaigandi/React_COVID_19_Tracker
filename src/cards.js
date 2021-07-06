import { React, useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

const Cards = ({ name, _id,value }) => {
  const [countryInfo, setCountryInfo] = useState('');
  const [getIndividualCountry, setgetIndividualCountry] = useState('');
  const testbutton=(event)=>{
    console.log(event.target.value)
  }
  const showDataHandler =  async (event) => {
const result = await (event.target.value); 
    console.log(result);
    setgetIndividualCountry(event.target.value);
    console.log(getIndividualCountry);
    const url =
      result === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${getIndividualCountry}`;
    let fetchingindData= await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log(countryInfo)
      });
  };

  return (
    <div key={_id}>
  
      <button
        className="displayItems"
        value={name}
        onClick={showDataHandler}
        id="button"
      >
        {name}
      </button>
      {/* <button onClick={testbutton} value={value}> click me!!! </button> */}
    </div>
  );
};

export default Cards;
