import React,{  useState, useEffect } from "react";
import Infoboxes from "./infoboxes";
import Map from "./Map";
import Table from "./Table";
import Cards from "./cards";
import { sortData } from "./util";
import LineGraph from "./LineGraph"
import './App.css'
import 'leaflet/dist/leaflet.css'
import { prettyPrintStat } from "./util";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

const url = "https://disease.sh/v3/covid-19/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapcenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [Mapcountries,setMapCountries] = useState([])
  const [casesType,setcasesType] = useState("cases")

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (e) => {
    e.preventDefault();
    let result = e.target.value;
    const url2 =
      result === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${result}`;
    await fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(result);
        setCountryInfo(data);
        console.log(country);
        console.log(countryInfo);
        setMapCenter([data.countryInfo.lat?data.countryInfo.lat:data.countryInfo.lat=34.80746,data.countryInfo.long])
        setMapZoom(4)
      });
  };
  useEffect(() => {}, [country]);

  useEffect(() => {}, [countryInfo]);

  useEffect(() => {
    getCountriesData();
  }, []);

  const getCountriesData = async () => {
    let fetchData = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
          flag: country.countryInfo.flag,
          _id: country.countryInfo._id,
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
        console.log({ countries });
      });
  };

  return (
    <div className="App">
      <div className="app_left">
        
          <div>
            <div className="Header">
              
              <h1> COVID - 19 Tracker </h1>
            </div>
            <div className="app_dropdown">
              <FormControl>
                <Select
                  variant="outlined"
                  value={country}
                  onClick={onCountryChange}
                >
                  <MenuItem value={"worldwide"}> Worldwide </MenuItem>
                  {countries.map((country, index) => (
                    <MenuItem value={country.name} key={index}>
                      
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="app_stats">
              
              {/* Info Boxes */} <h2> {countryInfo.country} </h2>
              <Infoboxes
              active={casesType==='cases'}
            isRed
              onClick={(e)=>{setcasesType('cases')}}
                title="Corona Cases"
                total={countryInfo.cases}
                cases={prettyPrintStat(countryInfo.todayCases)}
              />
              <Infoboxes
              active={casesType==='recovered'}
               onClick={(e)=>{setcasesType('recovered')}}
                title="Recoverd"
                total={countryInfo.recovered}
                cases={prettyPrintStat(countryInfo.todayRecovered)}
              />
              <Infoboxes
               active={casesType==='deaths'}
               isRed
               onClick={(e)=>{setcasesType('deaths')}}
                title="Deaths"
                total={countryInfo.deaths}
                cases={prettyPrintStat(countryInfo.todayDeaths)}
              />
            </div>
          </div>
          <div className="graphmap">
            <Map 
            countries={Mapcountries}
            casesType={casesType}
            center={mapcenter}
            zoom={mapZoom}/>
          </div>
          {/* <div className='container-fluid'><img src='World.svg' alt="svg" className='map'/></div> */}
    
      </div>
      <div>
        <Card className="app_right">
          
          <CardContent>
            <h3> Live Cases By contry </h3> {/* table */}
            <Table countries={tableData} /> <h3> World wide new cases </h3>
            {/* graph */} 
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
