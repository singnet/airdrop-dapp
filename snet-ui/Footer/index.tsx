import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { AIRDROP_LINKS, AIRDROP_SITE_STRING } from 'utils/airdropWindows';
import { Container, Link } from '@mui/material';

type FooterProps = {
  handleScrollToLink: (scrollToKey?: string) => void;
};
export default function Footer({ handleScrollToLink }: FooterProps) {
  return (
    <Grid
      sx={{
        bgcolor: 'primary.main',
        py: 5,
        px: 5,
        color: 'textAdvanced.secondary',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              borderRight: 'solid',
              borderRightWidth: [0, 1],
              borderRightColor: 'common.white',
            }}
          >
            <List subheader>
              <ListItem sx={{ justifyContent: 'right' }}>
                <img alt="" src="NuNet Logo.png" height="53px" />
              </ListItem>
              <ListItemButton
                component="a"
                href={AIRDROP_LINKS.WEBSITE}
                target="_blank"
                rel="noreferrer noopener"
                sx={{ justifyContent: 'right' }}
              >
                <Typography variant="link"> {AIRDROP_SITE_STRING} Site </Typography>
              </ListItemButton>
              <ListItemButton
                component="a"
                href="/contactus"
                target="_blank"
                rel="noreferrer noopener"
                sx={{ justifyContent: 'right' }}
              >
                <Typography variant="link"> Contact Us </Typography>
              </ListItemButton>
              <ListItem sx={{ justifyContent: 'right' }}>
                <Typography justifyContent="right" component="p">
                  A project powered by
                </Typography>
              </ListItem>
              <ListItem
                sx={{
                  justifyContent: 'right',
                }}
              >
                <img alt="" src="SNET Logo.png" width="130px" />
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
                    component={link.scrollToKey ? 'b' : 'a'}
                    href={link.url}
                    target={link.external ? '_blank' : ''}
                    rel={link.external ? 'noreferrer noopener' : ''}
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
        <Divider sx={{ bgcolor: 'common.white', my: 3 }} />
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item>
            <Typography align="center">Copyright © 2022 {AIRDROP_SITE_STRING}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem>
            {' '}
            |{' '}
          </Divider>
          <Grid item>
            <Link
              href="https://public.singularitynet.io/terms_and_conditions.html"
              target="_blank"
              color="inherit"
              underline="none"
            >
              Terms of Service
            </Link>
          </Grid>
          <Divider orientation="vertical" flexItem>
            {' '}
            |{' '}
          </Divider>
          <Grid item>
            <Link
              href="https://public.singularitynet.io/privacy_policy.html"
              target="_blank"
              color="inherit"
              underline="none"
            >
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
const LinksData = [
  {
    header: 'Airdrop',
    links: [
      { text: 'How Airdrop Works', scrollToKey: 'howitworks' },
      { text: 'Airdrop Rules', scrollToKey: 'rules' },
      { text: 'Airdrop Schedule', scrollToKey: 'schedule' },
      /* { text: 'F.A.Q', scrollToKey: 'faq' }, */
      { text: 'Contact Us', url: '/contactus', external: false },
    ],
  },
  {
    header: 'Community',
    links: [
      {
        text: 'Official Blog',
        url: `${AIRDROP_LINKS.BLOG_POST}`,
        external: true,
      },
      {
        text: 'Documentation',
        url: `${AIRDROP_LINKS.DOCUMENTATION}`,
        external: true,
      },
      {
        text: 'Telegram',
        url: `${AIRDROP_LINKS.TELEGRAM}`,
        external: true,
      },
    ],
  },
  {
    header: 'Social Media',
    links: [
      {
        text: 'Twitter',
        url: `${AIRDROP_LINKS.TWITTER}`,
        external: true,
      },
      {
        text: 'Facebook',
        url: `${AIRDROP_LINKS.FACEBOOK}`,
        external: true,
      },
      {
        text: 'LinkedIn',
        url: `${AIRDROP_LINKS.LINKEDIN}`,
        external: true,
      },
      {
        text: 'YouTube',
        url: `${AIRDROP_LINKS.YOUTUBE}`,
        external: true,
      },
    ],
  },
];
