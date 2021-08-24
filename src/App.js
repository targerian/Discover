import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesDate, getWeatherData } from "./api";
import { useEffect, useState } from "react";

function App() {
  //api status --------------
  const [places, setPlaces] = useState([]);
  const [filteredplaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  //------------------------------
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  //setting coordinates of the user on the first start up

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoordinates({ lat: latitude, lng: longitude })
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setLoading(true);

      getPlacesDate(type, bounds.sw, bounds.ne).then((data) => {
        console.log(data);
        console.log({ bounds });
        setPlaces(data?.filter((place) => place.name && place.num_reviews));
        setFilteredPlaces([]);
        setLoading(false);
      });
      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        console.log({ data });
        setWeatherData(data);
      });
    }
  }, [type, bounds]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "98%", margin: "0 12px" }}>
        <Grid
          item
          xs={12}
          md={4}
          style={{ height: "70vh", margin: "10 auto" }}
          gutterBottom
        >
          <List
            places={filteredplaces.length ? filteredplaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={filteredplaces.length ? filteredplaces : places}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            setBounds={setBounds}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
