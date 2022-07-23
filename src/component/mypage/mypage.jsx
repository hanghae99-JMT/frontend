import React from 'react';
import styles from './mypage.module.scss';
import { Container } from '@mui/material';
import Store from './store';

const MyPage = () => {
    return (
        <Container className={styles.mypage}>
            <section className={styles.user}>
                <p>User Name</p>
                <p>1234@gmail.com</p>
            </section>
            <section className={styles.tab}>
                {/* <ul className={styles.tab_menu}>
                    <li>좋아요 한 가게</li>
                    <li>후기</li>
                </ul> */}
                <ul className={styles.store}>
                    <Store />
                </ul>
            </section>
        </Container>
    );
};

export default MyPage;