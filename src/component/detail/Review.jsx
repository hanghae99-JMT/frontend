import React from "react";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { InheritHeightInputBox } from "../../Styles";

const Review = (props) => {
  const reviews = [
    { id: "갈비", text: "존맛탱구리~" },
    { id: "닭갈비", text: "마시따" },
    { id: "떡갈비", text: "굳굳!!" },
  ];
  return (
    <Box sx={{ my: 5 }}>
        <Typography sx={{display: "block"}} variant="h6">방문 후기</Typography>
      <Card
        sx={{
          display: "flex",
          p: 0.5,
          height: "fit-content",
        //   borderRadius: "5em",
        }}
      >
        <InheritHeightInputBox
          sx={{ flexGrow: 5, height: "100%"}}
          rows={3}
          size="small"
          multiline
        />
        <Button
          variant="contained"
          sx={{
            // borderRadius: "0 5em 5em 0",
            flexGrow: 1,
            fontSize: {sm: "1em", md: "1.5em"},
            minWidth: "fit-content",
            whiteSpace: "nowrap"
          }}
        >
         후기 등록
        </Button>
      </Card>
      {reviews.map((x, i) => {
        return (
          <Box sx={{ borderBottom: "1px solid #eee", py: 3 }} key={i}>
            <Typography color="primary" variant="h6">{x.id}</Typography>
            <Typography sx={{ whiteSpace: "pre" }} variant="body1">{x.text}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Review;
