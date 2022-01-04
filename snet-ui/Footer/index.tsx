import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import AppLogo from "public/AppLogo.png";
import { FAQPage } from "snet-ui/FAQ/index.stories";

type FooterProps = {
  handleScrollToLink: (scrollToKey?: string) => void;
};
export default function Footer({ handleScrollToLink }: FooterProps) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        //py: 5,
       // px: 5,
        color: "textAdvanced.secondary",
        height:"416px",
        width:"1440px"
      }}
    >
      <Box sx={{width:"1160px",height:"330.67px",pt:"42.67px",pl:"140px",pb:"42.66px"}}>
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
              <img src="NuNet Logo.png" height="53px" />
            </ListItem>
            <ListItemButton
              component="a"
              href="https://nunet.io/"
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
              <img src="SNET Logo.png" width="130px" />
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
                  component={link.scrollToKey ? "b" : "a"}
                  href={link.url}
                  target={link.external ? "_blank" : ""}
                  rel={link.external ? "noreferrer noopener" : ""}
                  key={link.text}
                  onClick={() => handleScrollToLink(link.scrollToKey)}
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
    </Box>
  );
}
const LinksData = [
  {
    header: "Airdrop",
    links: [
      {
        text: "How Airdrop Works",

        scrollToKey: "howitworks",
      },
      {
        text: "Airdrop Rules",

        scrollToKey: "rules",
      },
      {
        text: "Airdrop Schedule",

        scrollToKey: "schedule",
      },
      { text: "F.A.Q", scrollToKey: "faq" },
      { text: "Contact Us", url: "/contactus", external: false },
    ],
  },
  {
    header: "Community",
    links: [
      {
        text: "Official Blog",
        url: "https://medium.com/nunet",
        external: true,
      },
      { text: "Documentation", url: "https://nunet.io/#technology", external: true },
      { text: "Telegram", url: "https://t.me/NuNet_Community", external: true },
    ],
  },
  {
    header: "Social Media",
    links: [
      {
        text: "Twitter",
        url: "https://twitter.com/nunet_global",
        external: true,
      },
      {
        text: "Facebook",
        url: "https://www.facebook.com/NunetGlobal",
        external: true,
      },
      { text: "LinkedIn", url: "https://www.linkedin.com/company/nunet-global/", external: true },
      { text: "YouTube", url: "https://www.youtube.com/channel/UCLTTOrMYDTbQYHs1HCFPtfA", external: true },

    ],
  },
];
