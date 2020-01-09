import {
  container,
  whiteColor,
  title,
  mlAuto,
  mrAuto
} from "assets/jss/material-kit-pro-react.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.jsx";

const basicsStyle = {
  mlAuto,
  mrAuto,
  container,
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  ...tooltipsStyle,
  mainContainer: {
    paddingTop: "5vh"
  },
  sections: {
    padding: "70px 0"
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  space: {
    height: "1px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: whiteColor
  },
  textRight: {
    textAlign: "right"
  },
  floatRight: {
    float: "right"
  },
  inline: {
    display: "inline"
  },
  actionsTd: {
    textAlign: 'right',
    minWidth: '145px'
  }
};

export default basicsStyle;
