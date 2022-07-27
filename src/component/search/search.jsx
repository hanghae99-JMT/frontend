import React, { useEffect, useRef, useState } from "react";
import styles from "./search.module.scss";
import SearchItem from "./search_item";
import { Container, Button, Pagination, PaginationItem, CircularProgress } from "@mui/material";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import axios from "axios";
import JMTapis from "../../shared/resquests";
import Detail from "../detail/Detail";


const Search = () => {
    const input_ref = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchData, setSearchData] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [openDetail, setOpenDetail] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState({});
    const [progress, setProgress] = useState(false);
    const handleClose = (value) => {
        setOpenDetail(false);
    };
    const handleClickOpen = (item) => {
        console.log(item);
        setCurrentRestaurant(item);
        setOpenDetail(true);
    };

    // 위치 받아오기
    const onGeoOkay = (position) => {
        // lat = position.coords.latitude;
        // lng = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    };
    const onGeoError = () => {
        alert("I can't find you. No weather for you.");
    };
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);

    //검색
    const search = (e) => {
        e.preventDefault();
        let keyword = input_ref.current.value;
        let x = lat;
        let y = lng;
        {
            keyword == ""
                ? alert("검색어를 입력해주세요")
                : navigate(`/search?keyword=${keyword}&x=${x}&y=${y}&page=1`);
        }
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
        const y = lat + "";
        const x = lng + "";
        if (lat) {
            console.log(pageNumber);
            JMTapis.searchRestaurant({
                keyword: searchParams.get("keyword"),
                y: y,
                x: x,
                page: pageNumber,
            }).then((response) => {
                setSearchData(response.data.searchResult);

                // 전체 페이지 수 구하기
                setTotalCount(Math.min(Math.ceil(response.data.totalCount / 15), 3));
            });
        }
        setProgress(true);
    }, [lat, lng, pageNumber]);
    console.log(searchData);

    useEffect(() => {
    }, [searchData])

    const pageChange = (e) => {
        setPageNumber(e.target.textContent);
        let x = lat;
        let y = lng;
        navigate(
            `/search?keyword=${searchParams.get(
                "keyword"
            )}&x=${x}&y=${y}&page=${pageNumber}`
        );
    };
    return (
        <Container
            maxWidth="xl"
            style={{ minWidth: "100%" }}
            className={styles.search}
        >
                    <form action="" placeholder="">
                        <input
                            type="text"
                            placeholder="검색어를 입력 해주세요"
                            ref={input_ref}
                        />
                        <Button
                            className={styles.button}
                            variant="contained"
                            color="secondary"
                            onClick={search}
                        >
                            검색
                        </Button>
                    </form>
                    <ul>
                        {searchData &&
                            searchData.map((item) => (
                                <SearchItem
                                    key={item.rid}
                                    data={item}
                                    handleClick={() => handleClickOpen(item)}
                                />
                            ))}
                    </ul>
                    <Pagination
                        count={totalCount}
                        size="large"
                        color="primary"
                        id="pagination"
                        sx={{ justifyContent: "center", display: "flex" }}
                        onChange={pageChange}
                        renderItem={(item) => (
                            <PaginationItem {...item} sx={{ color: "#fff" }} />
                        )}
                    />
                    <Detail
                        open={openDetail}
                        onClose={handleClose}
                        restaurantProp={currentRestaurant}
                    />
        </Container >
    );
};
export default Search;
