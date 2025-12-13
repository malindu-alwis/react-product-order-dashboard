import { Box, Typography, Button, Paper } from "@mui/material";
import { Refresh, ErrorOutline, Inbox } from "@mui/icons-material";

interface ErrorFallbackProps {
  type: "error" | "empty";
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

function ErrorFallback({
  type,
  title,
  message,
  onRetry,
  retryLabel = "Try Again",
}: ErrorFallbackProps) {
  const isError = type === "error";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: "center",
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        backgroundColor: isError ? "#fef2f2" : "#f9fafb",
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: isError ? "#fee2e2" : "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        {isError ? (
          <ErrorOutline sx={{ fontSize: 32, color: "#dc2626" }} />
        ) : (
          <Inbox sx={{ fontSize: 32, color: "#6b7280" }} />
        )}
      </Box>

      <Typography variant="h6" fontWeight={600} color={isError ? "error.main" : "text.primary"} mb={1}>
        {title || (isError ? "Something went wrong" : "No data found")}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3} maxWidth={400} mx="auto">
        {message || (isError ? "We couldn't load the data. Please try again." : "There are no items to display at the moment.")}
      </Typography>

      {onRetry && (
        <Button
          variant={isError ? "contained" : "outlined"}
          startIcon={<Refresh />}
          onClick={onRetry}
          sx={{
            textTransform: "none",
            ...(isError && {
              backgroundColor: "#dc2626",
              "&:hover": { backgroundColor: "#b91c1c" },
            }),
          }}
        >
          {retryLabel}
        </Button>
      )}
    </Paper>
  );
}
export default ErrorFallback;