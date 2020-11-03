import React from 'react';
import UserBookList from './Books/UserBookList';
import RecBookList from './Reviews/RecBooksList';


export default function Home() {
    return (
        <div>
            
            <RecBookList />
            <UserBookList />
        </div>
    );
}