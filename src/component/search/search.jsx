import React, { useRef } from 'react';
import styles from './search.module.scss';
import SearchItem from './search_item';
import { Container, Button } from '@mui/material';

const Search = () => {
    const input_ref = useRef();
    return (
        <Container
            maxWidth='xl'
            className={styles.search}>
            <form action="" placeholder=''>
                <input type="text" placeholder='검색어를 입력 해주세요' ref={input_ref} />
                <Button
                    className={styles.button}
                    variant='contained'
                    color='secondary'
                >검색</Button>
            </form>
            <ul>
                <SearchItem />
            </ul>
        </Container>
    );
};

export default Search;