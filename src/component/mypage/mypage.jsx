import React, { useEffect, useState } from 'react';
import styles from './mypage.module.scss';
import { Container } from '@mui/material';
import Store from './store';
import { useDispatch, useSelector } from 'react-redux';
import Myreview from './myreview';
import axios from 'axios';

const MyPage = () => {
    const data = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const [like, setLike] = useState([]);
    const [review, setReview] = useState([]);
    useEffect(() => {
        if (tab === 0) {
            axios({
                method: "get",
                url: `/api/user/${data.id}/likes`
            }).then(response => setLike(response.data));
        } else {
            axios({
                method: "get",
                url: `/api/user/${data.id}/review`
            }).then(response => setReview(response.data));
        }
    }, [tab]);
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.mypage}>
            <section className={styles.user}>
                <p>{data?.id}</p>
                <p>{data?.username}</p>
            </section>
            <section className={styles.tab}>
                <ul className={styles.tab_menu}>
                    {tab === 0 ? <li onClick={() => setTab(0)} className={styles.focus}>좋아요 한 가게</li> : <li onClick={() => setTab(0)}>좋아요 한 가게</li>}
                    {tab === 1 ? <li onClick={() => setTab(1)} className={styles.focus}>후기</li> : <li onClick={() => setTab(1)} >후기</li>}
                </ul>
                {tab === 0 && <ul className={styles.tab_cont}>
                    {like && like.map(item => <Store key={item.rid} item={item} />)}
                </ul>}
                {tab === 1 && <ul className={styles.tab_cont}>
                    {review && review.map((item, index) => <Myreview key={index} item={item} />)}
                </ul>}
            </section>
        </Container>
    );
};

export default MyPage;