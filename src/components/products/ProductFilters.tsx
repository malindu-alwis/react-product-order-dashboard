import { Box, Paper, TextField, MenuItem, Typography, Slider, Button, InputAdornment } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  search: string;
  category: string;
  priceRange: number[];
  categories: string[];
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onPriceChange: (v: number[]) => void;
  onClear: () => void;
}

export default function ProductFilters({
  search,
  category,
  priceRange,
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onClear,
}: Props) {
  return (
    <Paper sx={{ p: 2.5, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterListIcon color="primary" />
          <Typography fontWeight={600} variant="subtitle1">
            Filters
          </Typography>
        </Box>
        <Button size="small" onClick={onClear} sx={{ color: "text.secondary" }}>
          Clear all
        </Button>
      </Box>

      <Box display="flex" gap={3} flexWrap="wrap" alignItems="flex-end">
        <TextField
          label="Search products"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 240 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ minWidth: 280 }}>
          <Typography fontSize={13} color="text.secondary" mb={1}>
            Price Range (${priceRange[0]} - ${priceRange[1]})
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, v) => onPriceChange(v as number[])}
            min={0}
            max={3000}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `$${v}`}
            sx={{
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}