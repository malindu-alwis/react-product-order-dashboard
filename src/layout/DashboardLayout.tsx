import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <Box 
          sx={{ 
            p: 3, 
            flexGrow: 1, 
            backgroundColor: "background.default",
            overflowY: "auto" 
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;