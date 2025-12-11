
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Topbar />
          <Box sx={{ p: 3, overflow: "auto", flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    )
}

export default MainLayout
