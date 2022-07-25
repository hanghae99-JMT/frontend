import React, { useEffect, useState } from 'react';
import styles from './mypage.module.scss';
import { Container } from '@mui/material';
import Store from './store';
import { getUserLikeThunk } from '../../redux/modules/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import Myreview from './myreview';

const MyPage = () => {
    const data = useSelector(state => state.restaurant.user);
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    useEffect(() => {
        dispatch(getUserLikeThunk());
    }, []);
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
                <ul className={styles.tab_menu}>
                    {tab === 0 ? <li onClick={() => setTab(0)} className={styles.focus}>좋아요 한 가게</li> : <li onClick={() => setTab(0)}>좋아요 한 가게</li>}
                    {tab === 1 ? <li onClick={() => setTab(1)} className={styles.focus}>후기</li> : <li onClick={() => setTab(1)} >후기</li>}
                </ul>
                {tab === 0 && <ul className={styles.tab_cont}>
                    {data && data.map(item => <Store key={item.rid} item={item} />)}
                </ul>}
                {tab === 1 && <ul className={styles.tab_cont}>
                    <Myreview />
                </ul>}
            </section>
        </Container>
    );
};

export default MyPage;