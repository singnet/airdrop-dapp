import React, { Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import StarsIcon from "@mui/icons-material/Stars";
import Box from "@mui/system/Box";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Rule = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  rules: Rule[];
  blogLink?: string;
};

export default function Rules({ title, rules, blogLink }: Props) {
  return (
    <Box>
      <Typography textAlign="center" fontWeight="bold" color="primary.main">
        {title}
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {rules.map((rule, index) => (
          <Fragment key={rule.title}>
            <ListItem>
              <ListItemText
                primary={
                  <Box alignItems="flex-start">
                    <StarsIcon color="primary" />
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      {rule.title}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                    {rule.description}
                  </Typography>
                }
              />
            </ListItem>
            {index !== rules.length - 1 ? <Divider variant="inset" component="li" /> : null}
          </Fragment>
        ))}
      </List>
      <Box textAlign="center">
        {blogLink ? (
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<OpenInNewIcon />}
            href={blogLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            Read Blog Post
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
