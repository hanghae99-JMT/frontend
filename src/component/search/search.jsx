import React, { useEffect, useRef, useState } from 'react';
import styles from './search.module.scss';
import SearchItem from './search_item';
import { Container, Button, Pagination, PaginationItem } from '@mui/material';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
    const input_ref = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchData, setSearchData] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    let lat, lng;
    // 위치 받아오기
    const onGeoOkay = (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    }
    const onGeoError = () => {
        alert("I can't find you. No weather for you.");
    }
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);

    //검색
    const search = (e) => {
        e.preventDefault();
        let keyword = input_ref.current.value;
        let x = lat
        let y = lng
        { keyword == '' ? alert('검색어를 입력해주세요') : navigate(`/search/keyword=${keyword}&x=${x}&y=${y}=[1]`); }
    }
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5001/search`,
        }).then((response) => {
            setSearchData(response.data.searchResult);

            // 전체 페이지 수 구하기
            setTotalCount(Math.ceil((response.data.totalCount) / 15));
        });
    }, []);
    console.log(searchData);

    const pageChange = (e) => {
        setPageNumber(e.target.textContent);
        let x = lat
        let y = lng
        navigate(`/search?keyword=${searchParams.get("keyword")}&x=${x}&y=${y}&page=${pageNumber}`);
    }
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.search}>
            <form action="" placeholder=''>
                <input type="text" placeholder='검색어를 입력 해주세요' ref={input_ref} />
                <Button
                    className={styles.button}
                    variant='contained'
                    color='secondary'
                    onClick={search}
                >검색</Button>
            </form>
            <ul>
                {searchData && searchData.map(item => <SearchItem key={item.rid} />)}
            </ul>
            <Pagination count={totalCount} size="large" color="primary" id='pagination'
                sx={{ justifyContent: "center", display: "flex" }}
                onChange={pageChange}
                renderItem={(item) => (
                    <PaginationItem {...item} sx={{ color: "#fff" }} />
                )} />
        </Container>
    );
};
export default Search;