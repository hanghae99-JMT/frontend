import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Card,
  CardMedia,
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  useMediaQuery,
  DialogContent,
} from "@mui/material";
import Review from "./Review";
import CallIcon from "@mui/icons-material/Call";
import LanguageIcon from "@mui/icons-material/Language";
import axios from "axios";
import MapContainer from "./MapContainer";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
/* global kakao */

const Detail = (props) => {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  const [restaurant, setRestaurant] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  console.log(fullScreen);
  const galbi =
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMzAg%2FMDAxNTk4MTk5Njk4MjUy.WmmGvgQ2iO9VuOuOknh_cxyzCveXvJRscCi_p3DdH4kg.1sKp3PhOujPe4pDVKjsOlerieKGUNJaIKQ5knIP6IB4g.JPEG.ps-flower%2Fps_%25B4%25EB%25C7%25A5%25BB%25E7%25C1%25F8%2528%25B8%25C0%25C1%25FD%2529_%25C1%25B6%25BC%25B1%25BF%25C1.jpg&type=sc960_832";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setRestaurant({
      rid: "1",
      name: "조선옥",
      category: "한식&gt;육류,고기요리".replace(/&gt;/g, ">"),
      address: "서울특별시 중구 을지로15길 6-5",
      phone: "010-0000-0000",
      like: 12,
      x: "37.5668121",
      y: "126.9934565",
      url: "https://www.naver.com",
    });
  }, []);

  // TODO: 검색결과가 리덕스에 들어간다면 올라간 따봉을 디스패치 필요
  // 좋아요 추가
  const addLike = () => {
    axios
      .post(`https://54db-61-85-61-48.jp.ngrok.io/api/like`, restaurant, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjRAbmF2ZXIuY29tIiwiZXhwIjozNTUwODk5NTc4fQ.8-tcRRoCjtRI9_RXSkhWJthwXJ_lngD46nNR-yIOJNE`,
        },
      })
      .then((res) => {
        console.log(res.data.like);
        setRestaurant({ ...restaurant, like: res.data.like });
      })
      .catch((e) => {
        alert("이미 좋아요한 가게입니다")
      });
  };

  useEffect(() => {
    axios.get(`https://54db-61-85-61-48.jp.ngrok.io/api/like`,{
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjRAbmF2ZXIuY29tIiwiZXhwIjozNTUwODk5NTc4fQ.8-tcRRoCjtRI9_RXSkhWJthwXJ_lngD46nNR-yIOJNE`,
        },
      }).then((res) => {
        alert("get 성공")
      }).catch((e) => {
        alert("get 실패")
      })
  }, [])

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
      <DialogTitle
        sx={{ height: 0, p: 0, justifyContent: "flex-end", display: "flex" }}
      >
        {onClose ? (
          <Button
            aria-label="close"
            onClick={onClose}
            variant="contained"
            color="thirdary"
            sx={{
              zIndex: 788800,
              width: "fit-content",
              height: "fit-content",
              minWidth: "0 !important",
              width: "3em",
              height: "3em",
              borderRadius: "2em",
              mt: 1,
              mr: 1,
            }}
          >
            <CloseIcon />
          </Button>
        ) : null}
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Container sx={{ my: 2 }}>
          <Card>
            <MapContainer x={restaurant?.x} y={restaurant?.y} />
          </Card>
          <Box sx={{ my: 5 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h3" sx={{ width: "fit-content " }}>
                {restaurant?.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{ ml: 1, color: "#555", whiteSpace: "pre" }}
              >
                {restaurant?.category}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
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
              >
                {restaurant?.address}
              </Typography>
              <Button
                component="a"
                variant="contained"
                href={`tel:${restaurant?.phone}`}
                sx={{
                  padding: ".5em 1em",
                  boxShadow: "0 2px 10px #eee",
                  borderRadius: "2em",
                  width: "fit-content",
                  my: 1,
                  ml: 1,
                }}
              >
                <CallIcon />
                {restaurant?.phone}
              </Button>
              <Button
                component="a"
                variant="contained"
                color="secondary"
                href={restaurant?.url}
                sx={{
                  padding: ".5em .5em",
                  boxShadow: "0 2px 10px #eee",
                  borderRadius: "2em",
                  width: "fit-content",
                  my: 1,
                  ml: 1,
                }}
              >
                <LanguageIcon />
              </Button>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                padding: ".5em 1em",
                boxShadow: "0 2px 10px #eee",
                borderRadius: "20rem",
                width: "fit-content",
              }}
              onClick={addLike}
              variant="contained"
            >
              <Typography component="div">
                <span style={{ fontSize: "2rem" }}>👍</span>
                <p>{restaurant?.like}</p>
              </Typography>
            </Button>
          </Box>
          <Review rid={restaurant?.rid}/>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default Detail;
