import React, { useEffect } from 'react';
import styles from './mypage.module.scss';
import { Container } from '@mui/material';
import Store from './store';
import { getUserLikeThunk } from '../../redux/modules/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';

const MyPage = () => {
    const data = useSelector(state => state.restaurant.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserLikeThunk());
    }, [])
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.mypage}>
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
                    {data && data.map(item => <Store key={item.rid} item={item} />)}
                </ul>
            </section>
        </Container>
    );
};

export default MyPage;