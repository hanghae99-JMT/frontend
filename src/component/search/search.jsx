import React, { useRef } from 'react';
import styles from './search.module.scss';
import SearchItem from './search_item';
import { Container, Button } from '@mui/material';

const Search = () => {
    const input_ref = useRef();
    const search = (e) => {
        e.preventDefault();
        console.log(input_ref.current.value);
    }
    return (
        <Container
            maxWidth='xl'
            style={{ minWidth: "100%" }}
            className={styles.search}>
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
                <SearchItem />
            </ul>
        </Container>
    );
};

export default Search;