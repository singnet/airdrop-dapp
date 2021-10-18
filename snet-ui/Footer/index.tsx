import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { ListItem } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", py: 5, px: 5, color: "textAdvanced.secondary" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            borderRight: "solid",
            borderRightWidth: [0, 1],
            borderRightColor: "common.white",
          }}
        >
          <List subheader={<img src="AirdropLogo.png" />}>
            <ListItemButton
              component="a"
              href="www.google.com"
              target="_blank"
              rel="noreferrer noopener"
              sx={{ justifyContent: "right" }}
            >
              <Typography variant="link"> Nunet Site </Typography>
            </ListItemButton>
            <ListItemButton
              component="a"
              href="www.google.com"
              target="_blank"
              rel="noreferrer noopener"
              sx={{ justifyContent: "right" }}
            >
              <Typography variant="link"> Contact Us </Typography>
            </ListItemButton>
            <ListItem sx={{ justifyContent: "right" }}>
              <Typography justifyContent="right" component="p">
                A project powered by
              </Typography>
            </ListItem>
            <ListItem sx={{ justifyContent: "right" }}>
              <img src="SNETLogoHorizontalWhite.png" />
            </ListItem>
          </List>
        </Grid>

        {LinksData.map((linkItem) => (
          <Grid item xs={12} sm={3} key={linkItem.header}>
            <List
              subheader={
                <Typography variant="h3" pl={2}>
                  {linkItem.header}
                </Typography>
              }
            >
              {linkItem.links.map((link) => (
                <ListItemButton
                  component="a"
                  href={link.url}
                  target={link.external ? "_blank" : ""}
                  rel={link.external ? "noreferrer noopener" : ""}
                  key={link.text}
                >
                  <Typography variant="link">{link.text}</Typography>
                </ListItemButton>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ bgcolor: "common.white", my: 3 }} />
      <Typography align="center">Copyright c 2021 Nunet</Typography>
    </Box>
  );
}

const LinksData = [
  {
    header: "Airdrop",
    links: [
      { text: "How Airdrop Works", url: "#", external: false },
      { text: "Airdrop Rules", url: "#", external: false },
      { text: "Airdrop Schedule", url: "#", external: false },
      { text: "F.A.Q", url: "#", external: false },
      { text: "Contact Us", url: "#", external: false },
    ],
  },
  {
    header: "Community",
    links: [
      { text: "Official Blog", url: "www.google.com", external: true },
      { text: "Documentation", url: "www.google.com", external: true },
      { text: "Telegram", url: "www.google.com", external: true },
    ],
  },
  {
    header: "Social Media",
    links: [
      { text: "Twitter", url: "www.google.com", external: true },
      { text: "Facebook", url: "www.google.com", external: true },
      { text: "LinkedIn", url: "www.google.com", external: true },
      { text: "YouTube", url: "www.google.com", external: true },
      { text: "Instagram", url: "www.google.com", external: true },
    ],
  },
];
