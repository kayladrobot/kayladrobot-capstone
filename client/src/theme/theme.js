import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export const boxStyle = {
  position: "absolute",
  top: { mobile: "50%", tablet: "50%" },
  left: "50%",
  padding: "0",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: { mobile: 2, tablet: 8 },
  py: { mobile: 3, tablet: 2 },
  width: { mobile: "100%", tablet: "90%" },
  height: { mobile: "auto", tablet: "75%" },
  borderRadius: { tablet: 1 },
};

export const endStyle = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    top: { mobile: "50%", tablet: "50%" },
    left: "50%",
    padding: "0",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    px: { mobile: 2, tablet: 8 },
  //   pl: { tablet: 8 },
    py: { mobile: 3, tablet: 2 },
    width: { mobile: "100%", tablet: "90%" },
    height: { mobile: "100%", tablet: "75%" },
    borderRadius: { tablet: 1 },
  };

export const buttonContainer = {
  display: "flex",
  flexDirection: "row",
  columnGap: { mobile: 1, tablet: 2 },
};

export const cancelButton = {
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  color: "#5C667E",
  fontStyle: "normal",
  textTransform: "none",
  fontWeight: 600,
  fontSize: 13,
  lineHeight: 20,
  width: { mobile: "100%", tablet: 72 },
  height: { mobile: 36, tablet: 38 },
  boxShadow: "unset",
  border: "1px solid #BDC5D5",
  "&:hover": {
    border: "1px solid #2E66E6",
    backgroundColor: "#FFFFFF",
    color: "#2E66E6",
  },
};

export const close = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
}

export const defaultButton = {
    borderRadius: ".5rem",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    fontSize: "1.5rem",
    border: ".1rem solid #000000",
    padding: ".8rem 4.8rem",
  };
