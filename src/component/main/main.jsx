import React from 'react';
import styles from './main.module.scss';
import { Container } from '@mui/material';
const Main = () => {
    return (
        <Container className={styles.main}>
            <h1>JMT</h1>
            <form action="" placeholder=''>
                <input type="text" placeholder='검색어를 입력해주세요' />
                <button>검색</button>
            </form>
        </Container>
    );
};

export default Main;