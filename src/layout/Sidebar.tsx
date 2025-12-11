
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <Drawer variant="permanent" open sx={{ width: 240 }}>
            <List sx={{ mt: 8 }}>
                <ListItemButton onClick={() => navigate("/products")}><ListItemText primary="Products" /></ListItemButton>
                <ListItemButton onClick={() => navigate("/orders")}><ListItemText primary="Orders" /></ListItemButton>
            </List>
        </Drawer>
    )
}

export default Sidebar
