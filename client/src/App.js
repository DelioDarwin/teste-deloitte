import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      equipamento: values.equipamento,
      target: values.target,
      data: values.data,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        equipamento: values.equipamento,
        target: values.target,
        data: values.data,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            equipamento: values.equipamento,
            target: values.target,
            data: values.data,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Teste - Deloitte</h1>

        <input
          type="text"
          name="equipamento"
          placeholder="Equipamento"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Target"
          name="target"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Data"
          name="data"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          equipamento={val.equipamento}
          target={val.target}
          data={val.data}
        />
      ))}
    </div>
  );
}
