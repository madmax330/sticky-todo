import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import typographyStyle from "assets/jss/material-kit-pro-react/components/typographyStyle.jsx";

function Info({ ...props }) {
  const { classes, children, className } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.infoText + " " + className}>
      {children}
    </div>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(typographyStyle)(Info);