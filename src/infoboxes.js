import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import "./InfoBox.css";
const Infoboxes = ({ title, cases, total,active,isRed,...props }) => {
  return (
    <Card
    onClick ={props.onClick}
    >
      <CardContent   className={`info_box ${active && "info--selected"} ${isRed && "info--Red"} `}>
        <Typography color="textSecondary" className="info_box_title">
       
          {title}
        </Typography>
        <h2 className={`info_box_cases ${!isRed && 'info--green'}`}> {cases} </h2>
        <Typography color="textSecondary" className="info_box_total">
          {total}
          &nbsp;
          <span id="total">Total</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Infoboxes;
