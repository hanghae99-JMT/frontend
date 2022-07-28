import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.scss';
import Ranking from './ranking';
import { Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JMTapis from '../../shared/resquests';
import Detail from '../detail/Detail';
import { setLoading } from '../../redux/userSlice';

const Main = () => {
    const [ranking, setRanking] = useState([]);
    const input_ref = useRef();
    const [openDetail, setOpenDetail] = useState(false)
    const handleClose = (value) => {
        setOpenDetail(false);
    };
    const navigate = useNavigate();
    const [currentRestaurant, setCurrentRestaurant] = useState({})
    const dispatch = useDispatch()

    const search = (e) => {
        e.preventDefault();
        let keyword = input_ref.current.value;
        { keyword == '' ? alert('검색어를 입력해주세요') : navigate(`/search?keyword=${keyword}`); }
    }
    const handleClickOpen = (item) => {
        console.log(item);
        setCurrentRestaurant(item)
        setOpenDetail(true)
    }


    useEffect(() => {
        dispatch(setLoading(true))
        JMTapis.getRanking().then(response => {
            setRanking(response.data)
            dispatch(setLoading(false))
        });
    }, []);

    useEffect(() => {
        console.log(currentRestaurant);
    }, [{ ...currentRestaurant }])
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.main}>
            <h1>JMT</h1>
            <form action="" placeholder=''>
                <input type="text" placeholder='검색어를 입력해주세요' ref={input_ref}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault();
                            let keyword = e.target.value;
                            { keyword == '' ? alert('검색어를 입력해주세요') : navigate(`/search?keyword=${keyword}`); }
                        }
                    }} />
                <Button
                    className={styles.button}
                    variant='contained'
                    color='secondary'
                    onClick={search}
                >검색</Button>
            </form>
            <ul>
                {ranking && ranking.map((item, index) => <Ranking key={item.rid} data={item} handleClick={() => handleClickOpen(item)} />)}
            </ul>
            <Detail open={openDetail} onClose={handleClose} restaurantProp={currentRestaurant} />
        </Container >
    );
};

export default Main;