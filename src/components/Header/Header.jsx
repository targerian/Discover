import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Typography,
  InputBase,
  Box,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import FlightIcon from "@material-ui/icons/Flight";

const Header = ({ setCoordinates }) => {
  const [autoComplete, setAutoComplete] = useState(null);
  const onLoad = (autoC) => {
    setAutoComplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  const isDesktop = useMediaQuery("(min-width:600px)");

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.title}>
          DISCOVER
          <FlightIcon fontSize={isDesktop ? "medium" : "small"} />
        </Typography>
        <Box display="flex" style={{ alignItems: "center" }}>
          {isDesktop && (
            <Typography
              variant="h6"
              className={classes.title}
              style={{ fontSize: "1rem" }}
            >
              Search For New Places
            </Typography>
          )}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
