import {
    container,
    cardTitle,
    description,
} from "assets/jss/material-kit-pro-react.jsx";

import imageStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";


const styles = {
    container,
    cardTitle,
    ...imageStyles,
    cardCategory: {
        marginTop: "10px",
        "& svg": {
            position: "relative",
            top: "8px"
        }
    },
    cardDescription: {
        ...description
    },
    space15: {
        height: "15px",
        display: "block"
    },
    justifyContentCenter: {
        WebkitBoxPack: "center !important",
        MsFlexPack: "center !important",
        justifyContent: "center !important"
    },
    mainContainer: {
        paddingTop: "5vh"
    },
    marginTop: {
        marginTop: "32px"
    }
};

export default styles;
