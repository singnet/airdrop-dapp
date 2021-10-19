import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
//import { faqSampleData } from "sample-data/faq";
import { faqSampleData } from "./faq";

const AccordionContainer = styled(Paper)`
  margin: 20px 20px 0 20px;
`;

// const Accordion = styled(MUIAccordion)`
//   flex: none;
//   transition: fill 0.25s;
//   width: 48px;
//   height: 48px;

//   &:hover {
//     fill: rebeccapurple;
//   }
// `;

export default function FAQPage() {
  return (
    <Box>
      <Typography align="center" color="bgtext.main" variant="h4">
        Frequently Asked Questions
      </Typography>
      <Box sx={{ m: 6 }}>
        <AccordionContainer sx={{ m: 15 }}>
          {faqSampleData.map((faq) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<AddSharpIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  "&:hover": {
                    bgcolor: "grey.50",
                  },
                }}
              >
                <Typography
                  color="textAdvanced.main"
                  sx={{
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionContainer>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography align="center" color="textAdvanced.main">
          Still Have Questions?
        </Typography>
        <Box textAlign="center">
          <Button
            variant="outlined"
            size="large"
            sx={{ justifyContent: "center" }}
          >
            <Typography color="secondary.main" fontSize="13px">
              Contact us
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
