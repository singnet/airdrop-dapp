import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Button } from "@mui/material";
//import { faqSampleData } from "sample-data/faq";
import { faqSampleData } from "./faq";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Box } from "@mui/system";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { forwardRef } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  borderTop: 0,
  borderRight: 0,
  borderLeft: 0,
});

function FAQPage(_,ref) {
  return (
    <Box ref={ref}>
      <Typography align="center" variant="h2" color="bgtext.main" mb={5}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ mx: [0, 19, 28], mt: 3 }}>
        {faqSampleData.map((faq) => (
          <Accordion key={faq.question}>
            <AccordionSummary
              expandIcon={<AddSharpIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&:hover": {
                  bgcolor: "bgFocus.main",
                },
              }}
            >
              <Typography
                color="bgtext.main"
                variant="h5"
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
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography align="center" color="textAdvanced.main" variant="body1">
          Still Have Questions?
        </Typography>
        <Box textAlign="center" sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            href="/contactus"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          >
            <Typography color="secondary.main" variant="subtitle2">
              Contact us
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default forwardRef(FAQPage);
