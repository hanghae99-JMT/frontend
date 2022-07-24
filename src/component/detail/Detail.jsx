import React from "react";
import { Container, Card, CardMedia, Box, Typography } from "@mui/material";
import Review from "./Review";

const Detail = (props) => {
    const name = "조선옥"
    const category = "한식&gt;육류,고기요리".replace(/&gt;/g, ">")
    const address = "서울특별시 중구 을지로15길 6-5"
    const desc = "연탄불 한우갈비 전문점."
    const galbi = "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_210%2F1441017873475QkA8B_JPEG%2F11679461_1.jpg"
  return (
    <>
      <Container sx={{my: 2}}>
        <Card>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              maxHeight: "25em",
              flexGrow: 1,
            }}
            image="Map-placeholder.png"
          />
        </Card>
        <Box sx={{my: 5}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-end"}}>
            <Typography variant="h3">{name}</Typography>
            <Typography variant="h5" sx={{ml: 1, color: "#555", whiteSpace: "pre"}}>{category}</Typography>
            </div>
            <Typography sx={{padding: ".5em 1em", boxShadow: "0 2px 10px #eee", borderRadius: "2em", width: "fit-content", my: 1}} color="primary">{address}</Typography>
            <Typography variant="body1" sx={{ml: 1, color: "#555", whiteSpace: "pre"}}>{desc}</Typography>
        </Box>
        <Card sx={{width: "25%"}}>
          <CardMedia
            component="img"
            sx={{
              maxHeight: "25em",
              flexGrow: 1,
            }}
            image={galbi}
          />
        </Card>
        <Review />
      </Container>
    </>
  );
};

export default Detail;
