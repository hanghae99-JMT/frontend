import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.scss';
import Ranking from './ranking';
import { Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JMTapis from '../../shared/resquests';
import Detail from '../detail/Detail';

const Main = () => {
    const [ranking, setRanking] = useState([]);
    const input_ref = useRef();
    let lat, lng;
    const [openDetail, setOpenDetail] = useState(false)
    const handleClose = (value) => {
        setOpenDetail(false);
    };
    const navigate = useNavigate();
    const [currentRestaurant, setCurrentRestaurant] = useState({})
    

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
    const handleClickOpen = (item) => {
        console.log(item);
        setCurrentRestaurant(item)
        setOpenDetail(true)
    }


    useEffect(() => {
        JMTapis.getRanking().then(response => setRanking(response.data));
    }, []);

    useEffect(() => {
        console.log(currentRestaurant);
    }, [{...currentRestaurant}])
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
                {ranking && ranking.map((item, index) => <Ranking key={item.rid} data={item} handleClick={() => handleClickOpen(item)}/>)}
            </ul>
            <Detail open={openDetail} onClose={handleClose} restaurantProp={currentRestaurant}/>
        </Container >
    );
};

export default Main;