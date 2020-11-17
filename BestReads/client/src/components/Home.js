import React from 'react';
import UserBookList from './Books/UserBookList';
import {Helmet} from "react-helmet";
import RecBookList from './Reviews/RecBooksList';


export default function Home() {
    return (
        <div>
            <Helmet>
                <title>Welcome to BestReads</title>
                <meta name="description" content="Nested component" />
            </Helmet>
            <RecBookList />
            <UserBookList />
        </div>
    );
}