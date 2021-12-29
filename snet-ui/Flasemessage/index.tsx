import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Falsemessage() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ bgcolor: "bgBox.main" }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="body2" color="text.secondary" sx={{ padding: 1 }}>
          Beware of false or phishing airdrop sites. Please double check the
          URLs before you continue.
        </Typography>
      </Box>
    </Box>
  );
}
