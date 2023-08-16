import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { removeUploadImg } from "../../Store/CarStore";
import LinearProgressBar from "../ProgressBar/ProgressBar";

export default function RowCard({
  imgUrl,
  imgTitle,
  index,
  uploadProgress,
  uploadImgFlag,
}) {
  const dispatch = useDispatch();

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: "93%", borderRadius: 15 }}
    >
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src={imgUrl}
            srcSet={imgUrl + "dpr=2 2x"}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
          {imgTitle.length <= 30 ? imgTitle : imgTitle.substring(0, 30) + "..."}
        </Typography>
        <Typography level="body-sm">
          {uploadProgress ? (
            <LinearProgressBar progressBar={uploadProgress} />
          ) : (
            ""
          )}
        </Typography>
      </CardContent>
      {!uploadImgFlag ? (
        <CardOverflow
          variant="soft"
          color="primary"
          sx={{
            px: 0.2,
            writingMode: "vertical-rl",
            textAlign: "center",
            fontSize: "xs",
            fontWeight: "xl",
            letterSpacing: "1px",
            textTransform: "uppercase",
            borderLeft: "1px solid",
            borderColor: "divider",
          }}
        >
          <IconButton
            aria-label="arrow-back"
            size="large"
            onClick={() => {
              dispatch(removeUploadImg(index));
            }}
          >
            <CloseIcon />
          </IconButton>
        </CardOverflow>
      ) : (
        ""
      )}
    </Card>
  );
}
