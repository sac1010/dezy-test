import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";

function debounce(func, delay = 1000) {
  let timeoutId;

  return function () {
    console.log("function called");
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
}

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
    setData(response.data.results);
    console.log(response.data, "data");
  }

  useEffect(() => {
    console.log("searching ")
    const debouncedGetData = debounce(getData);
    debouncedGetData();
  }, [search]);

  return (
    <>
      {data.length > 0 && (
        <div>
          <input
            placeholder="search"
            style={{}}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {data.map((pokemon) => {
              return <Card key={pokemon.name} name={pokemon.name} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
