import React from "react";
import "./card.css";
//import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  //const [open, setOpen] = React.useState(false);

  return (
    /*<>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        category={props.category}
        cost={props.cost}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />*/
      <div className="card-container">
        <h1 className="card-equipamento">{props.equipamento}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-target">{props.target}</p>
        <h3 className="card-data">{props.data}</h3>
      </div>
    //</>
  );
}
