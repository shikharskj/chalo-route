import {
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

const field = {
  marginTop: "20px",
  marginBottom: "20px",
};

const limeOptions = { color: "red" };

const ViewRoutes = () => {
  const [allRoutes, setAllRoutes] = useState(() =>
    JSON.parse(localStorage.getItem("allRoutes"))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [modalData, setModalData] = useState(null);

  const deleteRoute = (routeId) => {
    let routes = [...allRoutes.filter((item) => item.routeId !== routeId)];
    setAllRoutes(routes);
    localStorage.setItem("allRoutes", JSON.stringify(routes));
  };

  const updateRoute = (routeId) => {
    let data = allRoutes.filter((item) => item.routeId === routeId);
    setModalData({ ...data[0] });
    setIsOpen(true);
  };

  const handleRouteUpdate = () => {
    const index = allRoutes.findIndex(
      (element) => element.routeId === modalData.routeId
    );
    let list = [...allRoutes];
    list[index] = modalData;
    setAllRoutes([...list]);
    localStorage.setItem("allRoutes", JSON.stringify([...list]));
    setIsOpen(false);
  };

  const handleAddClick = () => {
    let list = [...modalData.stops];
    list.push({ stopName: "", lat: "", long: "" });
    setModalData({ ...modalData, stops: list });
  };

  const handleRemoveClick = (index) => {
    let list = [...modalData.stops];
    list.splice(index, 1);
    setModalData({ ...modalData, stops: list });
  };

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        component="h2"
        sx={{ marginTop: 2 }}
        color="primary"
      >
        All Routes
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "83vh", marginLeft: 5 }}
      >
        <Table
          sx={{ minWidth: "72vw" }}
          size="small"
          aria-label="routes-table"
          title="hfj"
          stickyHeader
        >
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "white",
                  backgroundColor: "#1876D1",
                },
              }}
            >
              <TableCell sx={{ paddingLeft: 11 }}>Route Name</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Stops</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRoutes?.map((route) => (
              <TableRow key={route.routeName}>
                <TableCell sx={{ paddingLeft: 8 }}>
                  <DirectionsBusFilledOutlinedIcon></DirectionsBusFilledOutlinedIcon>
                  {route.routeName}
                </TableCell>
                <TableCell>{route.direction}</TableCell>
                <TableCell>
                  <CircleIcon
                    color={route.status === "Active" ? "success" : "error"}
                    sx={{ fontSize: 12, marginRight: 1 }}
                  ></CircleIcon>
                  {route.status}
                </TableCell>
                <TableCell>
                  {route.stops?.map((stop, index) => {
                    return (
                      <p key={stop.stopName}>
                        {index + 1} - {stop.stopName}
                      </p>
                    );
                  })}
                </TableCell>
                <TableCell align="center">
                  <ButtonGroup variant="text" aria-label="action-btn-group">
                    <Button onClick={() => deleteRoute(route.routeId)}>
                      <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                    </Button>
                    <Button onClick={() => updateRoute(route.routeId)}>
                      <LaunchOutlinedIcon></LaunchOutlinedIcon>
                    </Button>
                    <Button>
                      <AddLocationAltOutlinedIcon
                        onClick={() => {
                          setIsMapOpen(true);
                          setMapData(route?.stops);
                        }}
                      ></AddLocationAltOutlinedIcon>
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal  */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
        <DialogTitle>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            Update route
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            {/* Route name  */}
            <TextField
              sx={field}
              fullWidth
              size="small"
              label="Route Name"
              variant="outlined"
              value={modalData?.routeName}
              onChange={(e) =>
                setModalData({ ...modalData, routeName: e.target.value })
              }
              required
            />

            <Grid container sx={{ ...field, justifyContent: "space-between" }}>
              <Grid item md={5.5}>
                <FormControl fullWidth>
                  <InputLabel id="direction-select-label">Direction</InputLabel>
                  <Select
                    labelId="direction-select-label"
                    label="Direction"
                    value={modalData?.direction}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        direction: e.target.value,
                      })
                    }
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
                    value={modalData?.status}
                    onChange={(e) =>
                      setModalData({ ...modalData, status: e.target.value })
                    }
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

              {modalData?.stops?.map((item, i) => {
                return (
                  <Grid
                    container
                    sx={{ ...field, justifyContent: "space-between" }}
                  >
                    <Grid item md={4}>
                      <TextField
                        fullWidth
                        name="stopName"
                        value={item.stopName}
                        onChange={(e) => {
                          let modifiedStops = [...modalData?.stops];
                          modifiedStops[i] = {
                            ...modifiedStops[i],
                            stopName: e.target.value,
                          };
                          setModalData({
                            ...modalData,
                            stops: modifiedStops,
                          });
                        }}
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
                        onChange={(e) => {
                          let modifiedStops = [...modalData?.stops];
                          modifiedStops[i] = {
                            ...modifiedStops[i],
                            lat: e.target.value,
                          };
                          setModalData({
                            ...modalData,
                            stops: modifiedStops,
                          });
                        }}
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
                        onChange={(e) => {
                          let modifiedStops = [...modalData?.stops];
                          modifiedStops[i] = {
                            ...modifiedStops[i],
                            long: e.target.value,
                          };
                          setModalData({
                            ...modalData,
                            stops: modifiedStops,
                          });
                        }}
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
                      {modalData?.stops?.length !== 1 && (
                        <IndeterminateCheckBoxOutlinedIcon
                          variant="outlined"
                          color="warn"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </IndeterminateCheckBoxOutlinedIcon>
                      )}
                      {modalData?.stops?.length - 1 === i && (
                        <AddBoxIcon
                          sx={{ marginTop: "0.5rem" }}
                          color="primary"
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            // size="large"
            variant="contained"
            type="submit"
            onClick={() => setIsOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            // size="large"
            variant="contained"
            type="submit"
            onClick={() => handleRouteUpdate()}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* MAP Dialog  */}
      <Dialog open={isMapOpen} onClose={() => setIsMapOpen(false)}>
        <DialogTitle> Route </DialogTitle>
        <DialogContent sx={{ height: "60vh", width: "60vh" }}>
          <MapContainer
            style={{ height: "100%", minHeight: "100%" }}
            center={[mapData[1]?.lat, mapData[1]?.long]}
            zoom={7}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapData?.map((stop) => (
              <Marker position={[stop?.lat, stop?.long]}></Marker>
            ))}
            <Polyline
              pathOptions={limeOptions}
              positions={mapData?.map((data) => [data?.lat, data?.long])}
            />
          </MapContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsMapOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewRoutes;
