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
import JMTapis from "../../shared/resquests";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
/* global kakao */

const Detail = (props) => {
  const { onClose, open, restaurantProp } = props;
  const handleClose = () => {
    console.log("**");
    onClose();
  };
  const [restaurant, setRestaurant] = useState(restaurantProp);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //   console.log(fullScreen);
  const galbi =
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MjRfMzAg%2FMDAxNTk4MTk5Njk4MjUy.WmmGvgQ2iO9VuOuOknh_cxyzCveXvJRscCi_p3DdH4kg.1sKp3PhOujPe4pDVKjsOlerieKGUNJaIKQ5knIP6IB4g.JPEG.ps-flower%2Fps_%25B4%25EB%25C7%25A5%25BB%25E7%25C1%25F8%2528%25B8%25C0%25C1%25FD%2529_%25C1%25B6%25BC%25B1%25BF%25C1.jpg&type=sc960_832";
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate()
  const [likeCount, setLikeCount] = useState()
  const [liked, setLiked] = useState(0)

  useEffect(() => {
    setLikeCount(restaurantProp?.like)
    setLiked(restaurantProp?.like_flag)
  }, [restaurantProp]);

  // TODO: 검색결과가 리덕스에 들어간다면 올라간 따봉을 디스패치 필요
  // 좋아요 추가
  const addLike = async() => {
    let new_like = likeCount
    await JMTapis.addLike(restaurantProp)
      .then((res) => {
        console.log(res.data.like);
        new_like = res.data.like
        setRestaurant({ ...restaurant, like: res.data.like });
      })
      .catch((e) => {
        console.log(e);
        if(e.response.status == 401) {alert("좋아요를 남기려면 로그인이 필요합니다.")
    navigate("/sign_in")}else{
        alert("문제가 발생했습니다." + e.data?.message)
    }
        
      });
      if(new_like){
        setLikeCount(new_like)
        setLiked(1)
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullScreen={fullScreen}
      key={restaurantProp?.rid}
      maxWidth="xl"
    >
      <DialogTitle
        sx={{ height: 0, p: 0, justifyContent: "flex-end", display: "flex" }}
      >
        {onClose ? (
          <Button
            aria-label="close"
            onClick={handleClose}
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
            <MapContainer x={restaurantProp?.x} y={restaurantProp?.y} />
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
                {restaurantProp?.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{ ml: 1, color: "#555", whiteSpace: "pre" }}
              >
                {restaurantProp?.category}
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
                {restaurantProp?.address}
              </Typography>
              <Button
                component="a"
                variant="contained"
                href={`tel:${restaurantProp?.phone}`}
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
                {restaurantProp?.phone}
              </Button>
              <Button
                component="a"
                variant="contained"
                color="secondary"
                href={restaurantProp?.url}
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
            <LikeButton
              sx={{
                padding: ".5em 1em",
                boxShadow: "0 2px 10px #eee",
                borderRadius: "20rem",
                width: "fit-content",
              }}
              onClick={addLike}
              variant="contained"
              disabled={liked}
              color={liked ? "primary" : "thirdary"}
            >
              <Typography component="div">
                <span style={{ fontSize: "2rem" }}>👍</span>
                <p>{likeCount}</p>
              </Typography>
            </LikeButton>
          </Box>
          <Review rid={restaurantProp?.rid} restaurant={restaurantProp}/>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

const LikeButton = styled(Button)(({ theme }) => ({
    '&:disabled':{
        color: "white",
        backgroundColor: theme.palette.primary.main,
        padding: ".5em 1em",
                boxShadow: "0 2px 10px #eee",
                borderRadius: "20rem",
                width: "fit-content",
    },
    button:{
        
    }
  }));

export default Detail;
