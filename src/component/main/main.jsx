import React, { useEffect, useRef } from 'react';
import styles from './main.module.scss';
import Ranking from './ranking';
import { Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const data = useSelector(state => state.restaurant.restaurant);
    const input_ref = useRef();
    const navigate = useNavigate();
    const search = async (e) => {
        e.preventDefault();
        let keyword = input_ref.current.value;
        let x = "1"
        let y = "2"
        await axios({
            method: "get",
            url: `http://localhost:5001/search?keyword=${keyword}&x=${x}&y=${y}`,
        }).then((response) => console.log(response));
        navigate(`/search`);
    }
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.main}>
            <h1>JMT</h1>
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
                {data && data.map((item, index) => <Ranking key={item.rid} index={index} data={item} />)}
            </ul>
        </Container >
    );
};

export default Main;