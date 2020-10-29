import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const BookSearchContext = React.createContext();

export function BookSearchProvider(props) {
    const [books, setBooks] =useState([]);
    const [book, setBook] = useState([]);
    const { getToken } = useContext(UserProfileContext);

  const searchBooks = (search) => 
      getToken().then((token) =>
        fetch(`/books/?query=${search}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
      }
  }).then((res) => res.json())
        .then(setBooks)
      );

    const getSelectedBook = (googleId) => 
        getToken().then((token) => 
            fetch(`/books/${googleId}/?googleId=${googleId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.json()
                .then(setBook)))
        


  return(
      <BookSearchContext.Provider value={{ books,book, getToken, searchBooks, getSelectedBook }}>
          {props.children}
      </BookSearchContext.Provider>
  )

}