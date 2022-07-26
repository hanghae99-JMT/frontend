import React, { useEffect, useRef } from "react";
import { CardMedia } from "@mui/material";
/* global kakao */

const MapContainer = (props) => {
  const { x, y } = props;
  const map = useRef();
  useEffect(() => {
    console.log("mapcontainer mounted");
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    console.log(container, map);
    // if(map?.current){
    console.log("draw");
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var markerPosition = new kakao.maps.LatLng(x, y);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
    // }
  }, []);
  return (
    <CardMedia
      component="div"
      id="map"
      ref={map}
      sx={{
        width: "100%",
        height: "25em",
        flexGrow: 1,
      }}
    />
  );
};

export default MapContainer;
