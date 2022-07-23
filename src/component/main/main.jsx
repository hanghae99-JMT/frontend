import React, { useRef } from 'react';
import styles from './main.module.scss';
import { Button, Container, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Ranking from './ranking';
const Main = () => {
    const input_ref = useRef();
    return (
        <Container
            maxWidth='xl'
            className={styles.main}>
            <h1>JMT</h1>
            <form action="" placeholder=''>
                <input type="text" placeholder='검색어를 입력 해주세요' ref={input_ref} />
                <Button
                    className={styles.button}
                    variant='contained'
                    color='secondary'
                >검색</Button>
            </form>
            <ul>
                <Ranking />
            </ul>
        </Container >
    );
};

export default Main;