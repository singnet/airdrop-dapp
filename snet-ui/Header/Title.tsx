import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import SnetSvgLogo from "snet-ui/images/BlackLogo.svg";

import { styles } from "./styles";

const useStyles = makeStyles(styles);

const Title = () => {
  const classes = useStyles();

  return (
    // @ts-ignore
    <h1 className={classes.h1}>
      {/* @ts-ignore */}
      <Link to={`/`} className={classes.logoAnchor}>
        <img src={SnetSvgLogo} alt="SingularityNET" loading="lazy" />
      </Link>
    </h1>
  );
};

export default Title;
