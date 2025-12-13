import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  InputBase, 
  Badge, 
  Avatar, 
  Box, 
  Typography 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorMode } from "../theme/ColorModeContext";

function Topbar() {
  const { mode, toggleMode } = useColorMode();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: mode === "light" ? "#e2e8f0" : "#334155",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: mode === "light" ? "#f1f5f9" : "#334155",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            width: 320,
          }}
        >
          <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{ flex: 1, color: "text.primary" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleMode} sx={{ color: "text.secondary" }}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <IconButton sx={{ color: "text.secondary" }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: 1 }}>
            <Avatar 
              sx={{ width: 36, height: 36, backgroundColor: "#6366f1" }}
            >
              MD
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                malindu alwis
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;