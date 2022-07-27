import React, { useEffect, useRef, useState } from "react";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { InheritHeightInputBox } from "../../Styles";
import axios from "axios";
import JMTapis from "../../shared/resquests";

const Review = (props) => {
  const {rid} = props;
  const [reviews, setReviews] = useState([]);
  const reviewText = useRef("");
  const [trigger, setTrigger] = useState({data:"data"})
  const token = sessionStorage.getItem("token")
  useEffect(() => {

  }, [rid])

  // 리뷰 등록
  const newReview = () => {
    console.log(reviewText.current.value);
    if (reviewText.current.value !== "") {
        console.log(reviewText.current.value);
      JMTapis.postReviews({rid, text: reviewText.current.value})
        .then((res) => {
          alert("등록 완료");
        })
        .catch((e) => {
          alert("문제가 발생했습니다." + e.data?.message);
          setTrigger(e.data)
        });
    } else {
      alert("최소 1자 이상 입력해주세요.");
    }
  };

  // 리뷰 목록 호출
  useEffect(() => {
    console.log("triggered", rid);
    JMTapis.getReviews(rid)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((e) => {
        console.log(e);
        alert(e.data?.message)})
  }, [trigger]);

  return (
    <Box sx={{ my: 5 }}>
      <Typography sx={{ display: "block" }} variant="h6">
        방문 후기
      </Typography>
      <Card
        sx={{
          display: "flex",
          p: 0.5,
          height: "fit-content",
          //   borderRadius: "5em",
        }}
      >
        <InheritHeightInputBox
          sx={{ flexGrow: 5, height: "100%" }}
          rows={3}
          size="small"
          multiline
          inputRef={reviewText}
        />
        <Button
          variant="contained"
          sx={{
            // borderRadius: "0 5em 5em 0",
            flexGrow: 1,
            fontSize: { sm: "1em", md: "1.5em" },
            minWidth: "fit-content",
            whiteSpace: "nowrap",
          }}
          onClick={newReview}
        >
          후기 등록
        </Button>
      </Card>
      {reviews?.map((x, i) => {
        return (
          <Box sx={{ borderBottom: "1px solid #eee", py: 3 }} key={i}>
            <Typography color="primary" variant="h6">
              {x?.id}
            </Typography>
            <Typography sx={{ whiteSpace: "pre" }} variant="body1">
              {x?.text}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Review;
