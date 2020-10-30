import React, { useState, useContext } from 'react';
import { UserProfileContext, userProfileContext } from './UserProfileProvider';

export const ReadStateContext = React.createContext();

export const ReadStateProvider = (props) => {
    const [readStates, setReadStates] = useState([]);
    const [readState, setReadState] = useState({});
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/readState"

    const getAllReadStates = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setReadStates));
    };

    const getAllReadStateForUser = (currentUserId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${currentUserId}/currentUserBooks`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setReadStates));
    };

    const getReadStateById = (id) => 
    getToken().then((token) =>
    fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json())
        .then(setReadState)
    );

    const addReadState = (rState) =>
        getToken().then((token) =>
            fetch("/api/post/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rState)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
        }));

    const editReadState = (rState) =>
        getToken().then((token) =>
            fetch(`/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rState),
        }));  
        
    
    return(
        <ReadStateContext.Provider value={{ readState, readStates, getAllReadStateForUser, getAllReadStates, getReadStateById, addReadState, editReadState }}>
            {props.children}
        </ReadStateContext.Provider>
    )    

}