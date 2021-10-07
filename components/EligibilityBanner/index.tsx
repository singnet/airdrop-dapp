import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useMemo } from "react";
import { SupportedChainId } from "snet-ui/Blockchain/connectors";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";

export default function EligibilityBanner() {
  const { account, chainId } = useActiveWeb3React();

  const network = useMemo(() => SupportedChainId[chainId ?? ""], [chainId]);

  if (!account) return null;

  return (
    <Box sx={{ bgcolor: "bgHighlight.main",  p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>Airdrop Eligibility</Typography>
          <Typography>Qualified for Airdrop Window 2/2</Typography>
          <a>View Details</a>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Connected Wallet Address</Typography>
          <Typography>{account}</Typography>
          <Typography sx={{ textTransform: "capitalize" }}>Ethereum {network?.toLowerCase()}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
