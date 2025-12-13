import {
    Box,
    Paper,
    TextField,
    MenuItem,
    Typography,
    Slider,
    Button,
    InputAdornment,
    Stack,
  } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import RestartAltIcon from "@mui/icons-material/RestartAlt";
  import { FilterList } from "@mui/icons-material";
  
  interface FilterOption {
    label: string;
    value: string;
  }
  
  interface UnifiedFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    dropdownValue?: string;
    onDropdownChange?: (value: string) => void;
    dropdownLabel?: string;
    dropdownOptions?: FilterOption[];
    showPriceRange?: boolean;
    priceRange?: number[];
    onPriceChange?: (value: number[]) => void;
    priceMin?: number;
    priceMax?: number;
    showReset?: boolean;
    onReset?: () => void;
  }
  
  export default function UnifiedFilters({
    search,
    onSearchChange,
    searchPlaceholder = "Search...",
    dropdownValue,
    onDropdownChange,
    dropdownLabel = "Filter",
    dropdownOptions = [],
    showPriceRange = false,
    priceRange = [0, 3000],
    onPriceChange,
    priceMin = 0,
    priceMax = 3000,
    showReset = false,
    onReset,
  }: UnifiedFiltersProps) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <FilterList sx={{ color: "text.secondary" }} />
          <Typography variant="subtitle1" fontWeight={600}>
            Filters
          </Typography>
        </Box>
  
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            sx={{ maxWidth: 350, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey.400", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
  
          {dropdownOptions.length > 0 && onDropdownChange && (
            <TextField
              select
              label={dropdownLabel}
              value={dropdownValue || ""}
              onChange={(e) => onDropdownChange(e.target.value)}
              size="small"
              sx={{ minWidth: 240 }}
            >
              <MenuItem value="">All</MenuItem>
              {dropdownOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
  

          {showPriceRange && onPriceChange && (
            <Box sx={{ minWidth: 240, px: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Price: ${priceRange[0]} – ${priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, v) => onPriceChange(v as number[])}
                min={priceMin}
                max={priceMax}
                step={50}
                size="small"
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `$${v}`}
              />
            </Box>
          )}
  
          {showReset && onReset && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={onReset}
              sx={{
                minWidth: 90,
                borderColor: "grey.300",
                color: "text.secondary",
                "&:hover": { borderColor: "grey.400", bgcolor: "grey.50" },
              }}
            >
              Reset
            </Button>
          )}
        </Stack>
      </Paper>
    );
  }
  