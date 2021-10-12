import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Step = {
  title: string;
  description: string;
};
type Props = {
  title: string;
  steps: Step[];
  blogLink?: string;
};

export default function Airdroprules({ title, steps, blogLink }: Props) {
  return (
    <Box
    //   sx={{
    //     bgcolor: "bgHighlight.main",

    //     height: "788px",
    //     width: "1440px",
    //     m: 8,
    //   }}
    >
      <Typography
        align="center"
        fontWeight="bold"
        color="bgtext.main"
        variant="h4"
      >
        {title}
      </Typography>
      <Box
      //sx={{ height: "660px", width: "963px" }}
      >
        <Grid container spacing={1} mt={4} justifyContent="center">
          {steps.map((step) => (
            <Grid item xs={9} sm={10} md={8}>
              <Box sx={{ display: "flex", p: 0.7, pr: 0 }}>
                <Box color="success" sx={{ mr: 1 }}>
                  <StarsOutlinedIcon color="primary" />
                </Box>
                <Typography
                  fontWeight="bold"
                  color="bgtext.main"
                  fontFamily="Montserrat"
                  variant="h6"
                >
                  {step.title}
                </Typography>
              </Box>
              <Typography>{step.description}</Typography>
              <hr />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Box textAlign="center">
            {blogLink ? (
              <Button
                variant="outlined"
                color="info"
                endIcon={<OpenInNewIcon />}
                href={blogLink}
                target="_blank"
                rel="noreferrer noopener"
              >
                Visit SingularityNet
              </Button>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
