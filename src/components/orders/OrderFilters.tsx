import { Box, Typography, TextField, MenuItem, InputAdornment, Paper } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

function OrderFilters({ searchQuery, onSearchChange, statusFilter, onStatusChange }: OrderFiltersProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <FilterList sx={{ color: "text.secondary" }} />
        <Typography variant="subtitle1" fontWeight={600}>Filters</Typography>
      </Box>
      
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Box sx={{ minWidth: 200 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            search order
          </Typography>
        <TextField
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            Status
          </Typography>
          <TextField
            select
            placeholder="select status..."
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            size="small"
            fullWidth
          >
            <MenuItem value="">All Statuses</MenuItem>
            {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
        </Box>
      </Box>
    </Paper>
  );
}

export default OrderFilters;
