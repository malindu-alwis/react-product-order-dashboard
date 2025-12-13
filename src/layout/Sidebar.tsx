import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useColorMode } from "../theme/ColorModeContext";

function Sidebar() {
  const { pathname } = useLocation();
  const { mode } = useColorMode();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/products", label: "Products", icon: <InventoryIcon /> },
    { path: "/orders", label: "Orders", icon: <ShoppingCartIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: mode ===  "light" ? "#1e293b" : 'white',
        color: mode ===  "light" ? "#fff" : "black",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >

      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#6366f1",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            left: 0,
            top: 0,
          }}
        >
          <InventoryIcon sx={{ color: "#fff" }} />
        </Box>
        <Typography variant="h6" fontWeight={700}>
          Assesment 
        </Typography>
      </Box>


      <List sx={{ px: 2, mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = item.path === "/" 
            ? pathname === "/" 
            : pathname.includes(item.path);
          
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: isActive ? "rgba(99, 102, 241, 0.2)" : "transparent",
                color: mode === "light"  ? (isActive ? "#a5b4fc" : "#94a3b8") : (isActive ? "black" : "black"),
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: mode === "light" ? "#a5b4fc" : 'black',
                },
                
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                sx={{color : mode ===  "light" ? "#fff" : "black"}}
                primary={item.label} 
                primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default Sidebar;