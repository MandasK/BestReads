import React, {useState, useContext} from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const BookContext = React.createContext();

export function BookProvider(props) {
    const [abooks, setABooks] = useState([]);
    const [abook, setABook] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllBooks = () => {
        getToken().then((token) =>
            fetch(`/api/book/`, {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
            .then(setABooks));
    };

    const getBookById = (id) =>
        getToken().then((token) =>
            fetch(`/api/book/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json(setABook))
            );

    const addBook = (book) => 
    getToken().then((token) => 
    fetch('/api/book', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)      
        }).then(resp => {
    if(resp.ok) {
        return resp.json()
    }
    throw new Error("Unauthorized");
    }));

    return(
        <BookContext.Provider value={{ abook, abooks, addBook, getAllBooks, getBookById, getToken }}>
            {props.children}
        </BookContext.Provider>
    )

}