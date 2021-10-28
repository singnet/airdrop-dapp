import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Learn() {
  return (
    <Box
      sx={{
        py: 3,
        bgcolor: "bgHighlight.main",
      }}
    >
      <Box
        sx={{
          my: 2,
          py: 2,
          justifyContent: "center",
          m: 8,
          //mx: [0, 3, 6],
          //px: [1, 3, 6],
          //mt: 5,
        }}
      >
        <Typography align="center" variant="h2" color="bgtext.main" mb={5}>
          Learn and Connect with the Community
        </Typography>
        <Grid container spacing={{ xs: 4 }}>
          <Grid item md={4}>
            <Card
            // sx={{
            //   my: 2,
            //   py: 2,
            // }}
            >
              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      my: 2,
                    }}
                  >
                    <img src="/images/Whitepaper.png" alt="SingularityNET" height="88px" width="98px" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <Box>
                        <Box>
                          <Typography align="center" variant="h4" color="bgtext.main">
                            Whitepaper
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: 2,
                            my: 1,
                            py: 1,
                          }}
                        >
                          <Typography align="center" variant="body1" color="bgtext.main">
                            Go through the whitepaper to understand the technical information, concept and roadmap of
                            the project.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card
            // sx={{
            //   my: 2,
            //   py: 2,
            // }}
            >
              <CardActionArea>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    <img src="/images/Telegram.png" alt="SingularityNET" height="88px" width="98px" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <Box>
                        <Box>
                          <Typography align="center" variant="h4" color="bgtext.main">
                            Telegram Community
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            my: 1,
                            py: 1,
                          }}
                        >
                          <Typography align="center" variant="body1" color="bgtext.main">
                            Did not find the answers you were looking for? Reach out to us and we will response to your
                            questions as soon as possible.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    <img src="/images/Documentation.png" alt="SingularityNET" height="88px" width="98px" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <Box>
                        <Box>
                          <Typography align="center" variant="h4" color="bgtext.main">
                            View Documentation
                          </Typography>
                        </Box>
                        <Box sx={{ my: 1, py: 1 }}>
                          <Typography align="center" variant="body1" color="bgtext.main">
                            Learn more about the stages of the airdrop process and how the airdrop rewards are
                            calculated.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
