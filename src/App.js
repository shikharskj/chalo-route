import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewRoutes from "./pages/ViewRoutes";
import CreateRoutes from "./pages/CreateRoutes";
import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import Layout from "./components/Layout";
const theme = createTheme({});

let routes = [
  {
    routeName: "Indore-Bhopal",
    direction: "UP",
    status: "Active",
    routeId: 0,
    stops: [
      {
        stopName: "Sarwate Bus Stand",
        lat: "22.7135",
        long: "75.8679",
      },
      {
        stopName: "Sehore Bypass",
        lat: "23.198437",
        long: "77.095184",
      },
      {
        stopName: "ISBT Bhopal",
        lat: "23.2295",
        long: "77.4438",
      },
      {
        stopName: "Narmadapuram terminal",
        lat: "22.7519",
        long: "77.7289",
      },
      {
        stopName: "Chhindwara IST",
        lat: "22.0574",
        long: "78.9382",
      },
    ],
  },
  {
    routeName: "Lucknow-Delhi",
    direction: "UP",
    status: "Inactive",
    routeId: 1,
    stops: [
      {
        stopName: "Sarwate Bus Stand",
        lat: "22.7135",
        long: "75.8679",
      },
      {
        stopName: "Sehore Bypass",
        lat: "23.198437",
        long: "77.095184",
      },
      {
        stopName: "ISBT Bhopal",
        lat: "23.2295",
        long: "77.4438",
      },
    ],
  },
  {
    routeName: "Kanpur-Banaras",
    direction: "DOWN",
    status: "Active",
    routeId: 2,
    stops: [
      {
        stopName: "Sarwate Bus Stand",
        lat: "22.7135",
        long: "75.8679",
      },
      {
        stopName: "Sehore Bypass",
        lat: "23.198437",
        long: "77.095184",
      },
      {
        stopName: "ISBT Bhopal",
        lat: "23.2295",
        long: "77.4438",
      },
      {
        stopName: "Narmadapuram terminal",
        lat: "22.7519",
        long: "77.7289",
      },
      {
        stopName: "Chhindwara IST",
        lat: "22.0574",
        long: "78.9382",
      },
    ],
  },
  {
    routeName: "Gaziabad-Noida",
    direction: "DOWN",
    status: "Inactive",
    routeId: 3,
    stops: [
      {
        stopName: "Sarwate Bus Stand",
        lat: "22.7135",
        long: "75.8679",
      },
      {
        stopName: "Sehore Bypass",
        lat: "23.198437",
        long: "77.095184",
      },
      {
        stopName: "ISBT Bhopal",
        lat: "23.2295",
        long: "77.4438",
      },
    ],
  },
  {
    routeName: "Dehradun-Rishikesh",
    direction: "UP",
    status: "Active",
    routeId: 4,
    stops: [
      {
        stopName: "Sarwate Bus Stand",
        lat: "22.7135",
        long: "75.8679",
      },
      {
        stopName: "Sehore Bypass",
        lat: "23.198437",
        long: "77.095184",
      },
      {
        stopName: "ISBT Bhopal",
        lat: "23.2295",
        long: "77.4438",
      },
      {
        stopName: "Narmadapuram terminal",
        lat: "22.7519",
        long: "77.7289",
      },
      {
        stopName: "Chhindwara IST",
        lat: "22.0574",
        long: "78.9382",
      },
    ],
  },
  {
    routeName: "Lucknow-Kanpur",
    direction: "UP",
    status: "Active",
    routeId: 5,
    stops: [
      {
        stopName: "Sarwate Bus Stand",
        lat: "22.7135",
        long: "75.8679",
      },
      {
        stopName: "Sehore Bypass",
        lat: "23.198437",
        long: "77.095184",
      },
      {
        stopName: "ISBT Bhopal",
        lat: "23.2295",
        long: "77.4438",
      },
    ],
  },
];

function App() {
  useEffect(() => {
    localStorage.setItem("allRoutes", JSON.stringify(routes));
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<ViewRoutes />} />
            <Route path="/create" element={<CreateRoutes />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
