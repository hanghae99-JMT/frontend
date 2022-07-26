import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.scss';
import Ranking from './ranking';
import { Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [ranking, setRanking] = useState([]);
    const input_ref = useRef();
    let lat, lng;
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: "get",
            url: 'https://910e-61-85-61-48.jp.ngrok.io/api/ranking',
        }).then(response => setRanking(response.data));
    }, []);
    const onGeoOkay = (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    }
    const onGeoError = () => {
        alert("I can't find you. No weather for you.");
    }
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
    const search = (e) => {
        e.preventDefault();
        let keyword = input_ref.current.value;
        let x = lat
        let y = lng
        { keyword == '' ? alert('검색어를 입력해주세요') : navigate(`/search?keyword=${keyword}&x=${x}&y=${y}&page=1`); }
    }
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.main}>
            <h1>JMT</h1>
            <form action="" placeholder=''>
                <input type="text" placeholder='검색어를 입력해주세요' ref={input_ref} />
                <Button
                    className={styles.button}
                    variant='contained'
                    color='secondary'
                    onClick={search}
                >검색</Button>
            </form>
            <ul>
                {ranking && ranking.map((item, index) => <Ranking key={item.rid} data={item} />)}
            </ul>
        </Container >
    );
};

export default Main;