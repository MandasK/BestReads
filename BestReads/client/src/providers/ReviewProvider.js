import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const ReviewContext = React.createContext();

export function ReviewProvider(props) {
    
    const[reviews, setReviews] = useState([]);
    const [recBooks, setRecBooks] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/reviews";

    //api/reviews/20/getReviewsByBook

    const getAllReviews = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            }).then(resp => resp.json())
                .then(setReviews)
                );
    
    const getReviewsByBookId = (bookId) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${bookId}/getReviewsByBook`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }  
            }).then(res => res.json())
            );            

    const getReviewById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.json())
            );   
            
    const getRecBooks = (num, block) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${num}/${block}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setRecBooks))
        };        
    
    const addReview = (review) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            }).then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized")
            })
            );
            
    const editReview = (review) =>
            getToken().then((token) =>
                fetch(`${apiUrl}/${review.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(review)  
                }));

    const deleteReview = (id) =>
            getToken().then((token) =>
                fetch(`${apiUrl}/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }));        

    return(
        <ReviewContext.Provider value={{ reviews, recBooks, getAllReviews, getReviewById, getReviewsByBookId, getRecBooks, addReview, editReview, deleteReview }}>
            {props.children}
        </ReviewContext.Provider>
    )            
                
}