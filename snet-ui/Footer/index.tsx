import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import AppLogo from "public/AppLogo.png";
import { FAQPage } from "snet-ui/FAQ/index.stories";

type Eligibil = {
  onViewRules: () => void;
};
export default function Footer({ onViewRules }: Eligibil) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        py: 5,
        px: 5,
        color: "textAdvanced.secondary",
      }}
    >
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
          <List subheader>
            <ListItem sx={{ justifyContent: "right" }}>
              <img src="NuNet Logo.png" width="171.5px" height="52.27px" />
            </ListItem>
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
              href="/contactus"
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
            <ListItem
              sx={{
                justifyContent: "right",
               
              }}
            >
              <img src="SNETLogo.png" height="37.7px" width="129.26px"/>
            </ListItem>
          </List>
        </Grid>

        {LinksData.map((linkItem) => (
          <Grid item xs={12} sm={3} key={linkItem.header}>
            <List
              subheader={
                <Typography variant="h3" pl={2} sx={{ m: 2 }}>
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
                  <Typography variant="body1" sx={{ m: 2, mt: 0, mb: 0 }}>
                    {link.text}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ bgcolor: "common.white", my: 3 }} />
      <Typography align="center">Copyright © 2021 Nunet</Typography>
    </Box>
  );
}

const LinksData = [
  {
    header: "Airdrop",
    links: [
      { text: "How Airdrop Works", url: "/howitworks", external: false },
      { text: "Airdrop Rules", url:"/rules", external: false },
      { text: "Airdrop Schedule", url: "/schedule", external: false },
      { text: "F.A.Q", url: "/faqpage", external: false },
      { text: "Contact Us", url: "/contactus", external: false },
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
