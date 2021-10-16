import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Whitepaper from "public/images/Whitepaper.png";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { CardActionArea } from "@mui/material";
import Telegram from "public/images/Telegram.png";
import Documentation from "public/images/Documentation.png";

export default function AutoGrid() {
  return (
    <Box sx={{ height: "512px", width: "1440px", bgcolor: "bgHighlight.main" }}>
      <Box
        sx={{
          height: "384px",
          width: "1158px",
          justifyContent: "center",
          m: 8,
        }}
      >
        <Typography align="center" variant="h2" color="bgtext.main" mb={5}>
          Learn and Connect with the Community
        </Typography>
        <Grid container columnSpacing={{ xs: 4 }}>
          <Grid item xs={4}>
            <Card sx={{ height: "288px", width: "370px" }}>
              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <Image
                      src={Whitepaper}
                      alt="SingularityNET"
                      height="88px"
                      width="98px"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      //pb: 3,
                    }}
                  >
                    <Box>
                      <Box sx={{ height: "112px", width: "322.28px" }}>
                        <Box sx={{ height: "24px", width: "316px" }}>
                          <Typography
                            align="center"
                            variant="h4"
                            color="bgtext.main"
                          >
                            Whitepaper
                          </Typography>
                        </Box>
                        <Box sx={{ height: "72px", width: "316.18px", m: 2 }}>
                          <Typography
                            align="center"
                            variant="body1"
                            color="bgtext.main"
                            //mb={5}
                          >
                            Go through the whitepaper to understand the
                            technical information, concept and roadmap of the
                            project.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ height: "288px", width: "370px" }}>
              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <Image
                      src={Telegram}
                      alt="SingularityNET"
                      height="88px"
                      width="98px"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      //pb: 3,
                    }}
                  >
                    <Box>
                      <Box sx={{ height: "112px", width: "322.28px" }}>
                        <Box sx={{ height: "24px", width: "316px" }}>
                          <Typography
                            align="center"
                            variant="h4"
                            color="bgtext.main"
                          >
                            Telegram Community
                          </Typography>
                        </Box>
                        <Box sx={{ height: "72px", width: "316.18px", m: 2 }}>
                          <Typography
                            align="center"
                            variant="body1"
                            color="bgtext.main"
                            //mb={5}
                          >
                            Did not find the answers you were looking for? Reach
                            out to us and we will response to your questions as
                            soon as possible.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ height: "288px", width: "370px" }}>
              <CardActionArea>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <Image
                      src={Documentation}
                      alt="SingularityNET"
                      height="88px"
                      width="98px"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      //pb: 3,
                    }}
                  >
                    <Box>
                      <Box sx={{ height: "112px", width: "322.28px" }}>
                        <Box sx={{ height: "24px", width: "316px" }}>
                          <Typography
                            align="center"
                            variant="h4"
                            color="bgtext.main"
                          >
                            View Documentation
                          </Typography>
                        </Box>
                        <Box sx={{ height: "72px", width: "316.18px", m: 2 }}>
                          <Typography
                            align="center"
                            variant="body1"
                            color="bgtext.main"
                            //mb={5}
                          >
                            Learn more about the stages of the airdrop process
                            and how the airdrop rewards are calculated.
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
