import React from "react";
import {
  Container,
  Card,
  CardMedia,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Review from "./Review";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
/* global kakao */

const Detail = (props) => {
  const restaurant = {
    name: "조선옥",
    category: "한식&gt;육류,고기요리".replace(/&gt;/g, ">"),
    address: "서울특별시 중구 을지로15길 6-5",
    desc: "연탄불 한우갈비 전문점.",
    phone: "010-0000-0000",
    like: 12,
    x: 37.5668121,
    y: 126.9934565,
    url: "https://www.naver.com"
  };
  const galbi =
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMzAg%2FMDAxNTk4MTk5Njk4MjUy.WmmGvgQ2iO9VuOuOknh_cxyzCveXvJRscCi_p3DdH4kg.1sKp3PhOujPe4pDVKjsOlerieKGUNJaIKQ5knIP6IB4g.JPEG.ps-flower%2Fps_%25B4%25EB%25C7%25A5%25BB%25E7%25C1%25F8%2528%25B8%25C0%25C1%25FD%2529_%25C1%25B6%25BC%25B1%25BF%25C1.jpg&type=sc960_832";

  React.useEffect(() => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(restaurant.x, restaurant.y), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var markerPosition = new kakao.maps.LatLng(restaurant.x, restaurant.y);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [restaurant.x, restaurant.y]);
  return (
    <>
      <Container sx={{ my: 2 }} >
        <Card>
          <CardMedia
            component="div"
            id="map"
            sx={{
              width: "100%",
              height: "25em",
              flexGrow: 1,
            }}
          />
        </Card>
        <Box sx={{ my: 5 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              flexWrap: "wrap"
            }}
          >
            <Typography variant="h3" sx={{width: "fit-content "}}>{restaurant.name}</Typography>
            <Typography
              variant="h5"
              sx={{ ml: 1, color: "#555", whiteSpace: "pre" }}
            >
              {restaurant.category}
            </Typography>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Typography
              sx={{
                padding: ".5em 1em",
                boxShadow: "0 2px 10px #eee",
                borderRadius: "2em",
                width: "fit-content",
                my: 1,
              }}
              color="primary"
            >{restaurant.address}
            </Typography>
            <Button
              component="a"
              variant="contained"
              href={`tel:${restaurant.phone}`}
              sx={{
                padding: ".5em 1em",
                boxShadow: "0 2px 10px #eee",
                borderRadius: "2em",
                width: "fit-content",
                my: 1,
                ml: 1
              }}
            >
              <CallIcon />{restaurant.phone}
            </Button>
            <Button
              component="a"
              variant="contained"
              color="secondary"
              href={restaurant.url}
              sx={{
                padding: ".5em .5em",
                boxShadow: "0 2px 10px #eee",
                borderRadius: "2em",
                width: "fit-content",
                my: 1,
                ml: 1
              }}
            >
              <LanguageIcon />
            </Button>
            {/* <Typography
            sx={{
              padding: ".5em 1em",
              boxShadow: "0 2px 10px #eee",
              borderRadius: "2em",
              width: "fit-content",
              my: 1,
            }}
            color="primary"
          >
            {restaurant.address}
          </Typography> */}
          </div>
          <Typography
            variant="body1"
            sx={{ my: 2, ml: 1, color: "#555", whiteSpace: "pre" }}
          >
            {restaurant.desc}
          </Typography>
        </Box>
        <Card sx={{maxWidth: "25rem"}}>
          <CardMedia
            component="img"
            sx={{
                minWidth: "100%",
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
