import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
import SearchCard from "./components/SearchCard";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();
  const debounceTimeout = useRef(null);

  async function getData(search = "") {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search}`
      );
      if (search) {
        console.log(response.data);
        setSearchData(response.data);
      } else {
        setData(response.data.results);
      }
    } catch (e) {
      setData([]);
      setSearchData(null);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  const handleSearch = (val)=>{
    setSearch(val);
    console.log("searching ");
    if (debounceTimeout.current !== null) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      getData(val);
    }, 3000);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="search"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
      </div>
      {!search && data?.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: "20px",
            }}
          >
            {data.map((pokemon) => {
              return <Card key={pokemon.name} name={pokemon.name} />;
            })}
          </div>
        </div>
      )}
      {search && searchData ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "20px",
          }}
        >
          <SearchCard
            name={searchData.forms[0].name}
            abilities={searchData.abilities}
          />
        </div>
      ) : (
        <div>No results found</div>
      )}
    </>
  );
}

export default App;
