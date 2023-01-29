import { Add, SubjectOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "View Routes",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
      text: "Create Route",
      icon: <Add color="primary" />,
      path: "/create",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* app bar  */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 0",
            }}
            color="primary"
          >
            <DirectionsBusFilledOutlinedIcon fontSize="10"></DirectionsBusFilledOutlinedIcon>
            Chalo
          </Typography>
        </div>
        <List>
          {menuItems?.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{ background: location.pathname === item.path && "#f5f5f5" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <div sx={{ background: "#f9f9f9", width: "100%" }}>{children}</div>
    </Box>
  );
};

export default Layout;
