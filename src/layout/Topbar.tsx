
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const Topbar = ({ onToggleTheme }: { onToggleTheme?: () => void }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Inventory Dashboard</Typography>
        <IconButton color="inherit" onClick={onToggleTheme}><Brightness4Icon /></IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
