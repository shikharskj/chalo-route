import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

let field = {
  marginTop: "20px",
  marginBottom: "20px",
};

const useStyles = makeStyles({});
const CreateRoutes = () => {
  const navigate = useNavigate();

  const [routeName, setRouteName] = useState("");
  const [direction, setDirection] = useState("UP");
  const [status, setStatus] = useState("Active");
  const [stops, setStops] = useState([
    {
      stopName: "",
      lat: "",
      long: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stops];
    list[index][name] = value;
    setStops(list);
  };

  const handleAddClick = () => {
    setStops([...stops, { stopName: "", lat: "", long: "" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...stops];
    list.splice(index, 1);
    setStops(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (routeName) {
      let list = JSON.parse(localStorage.getItem("allRoutes"));
      list.push({ routeName, direction, status, stops });
      localStorage.setItem("allRoutes", JSON.stringify([...list.reverse()]));
      navigate("/");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          width: "65vw",
          margin: "4rem 3rem",
          padding: "4rem",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Create a new route
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* Route name  */}
          <TextField
            sx={field}
            fullWidth
            size="small"
            label="Route Name"
            variant="outlined"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            required
          />

          <Grid container sx={{ ...field, justifyContent: "space-between" }}>
            <Grid item md={5.5}>
              <FormControl fullWidth>
                <InputLabel id="direction-select-label">Direction</InputLabel>
                <Select
                  labelId="direction-select-label"
                  label="Direction"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  size="small"
                >
                  <MenuItem value={"UP"}>UP</MenuItem>
                  <MenuItem value={"DOWN"}>DOWN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={5.5}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Stops -  */}
          <FormControl fullWidth sx={field}>
            <FormLabel>
              <Typography variant="h5">Stops -</Typography>
            </FormLabel>

            {stops?.map((item, i) => {
              return (
                <Grid
                  container
                  sx={{ ...field, justifyContent: "space-between" }}
                  key={item.stopName}
                >
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      name="stopName"
                      value={item.stopName}
                      onChange={(e) => handleInputChange(e, i)}
                      label="Stop name"
                      variant="outlined"
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      fullWidth
                      name="lat"
                      value={item.lat}
                      onChange={(e) => handleInputChange(e, i)}
                      label="Latitude"
                      variant="outlined"
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      fullWidth
                      name="long"
                      value={item.long}
                      onChange={(e) => handleInputChange(e, i)}
                      label="Longitude"
                      variant="outlined"
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    md={1}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}
                  >
                    {stops?.length !== 1 && (
                      <IndeterminateCheckBoxOutlinedIcon
                        variant="outlined"
                        fontSize="large"
                        color="warn"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </IndeterminateCheckBoxOutlinedIcon>
                    )}
                    {stops?.length - 1 === i && (
                      <AddBoxIcon
                        sx={{ marginTop: "0.5rem" }}
                        color="primary"
                        fontSize="large"
                        onClick={handleAddClick}
                      >
                        Add
                      </AddBoxIcon>
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </FormControl>

          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid
              item
              md={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                size="large"
                variant="contained"
                type="submit"
                color="primary"
              >
                Add Route
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateRoutes;
