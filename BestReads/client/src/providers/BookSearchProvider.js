import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const BookSearchContext = React.createContext();

export function BookSearchProvider(props) {
    const [books, setBooks] =useState([]);
    const { getToken } = useContext(UserProfileContext);

  const searchBooks = (search) => {
  return fetch(`books/?query=${search}`)
  .then((res) =>res.json())
  .then(setBooks);
  };

  return(
      <BookSearchContext.Provider value={{ books, getToken, searchBooks }}>
          {props.children}
      </BookSearchContext.Provider>
  )

}