import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function IconButtons(props) {
  const { actionToDo } = props;
  return (
    <IconButton aria-label="arrow-back" size="large" onClick={actionToDo}>
      <ArrowBackIcon color="action" fontSize="inherit" />
    </IconButton>
  );
}
