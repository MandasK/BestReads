import React, { useState, useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const ReadStateContext = createContext();

export function ReadStateProvider(props) {
    const { getToken }= useContext(UserProfileContext);
    const [readStates, setReadStates] = useState([]);
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

    const getReadStateById = (id) => {
      return getToken().then((token) =>
       fetch(`${apiUrl}/${id}/details`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
      )
    }

    const addReadState = (rState) =>
        getToken().then((token) =>
            fetch(apiUrl, {
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
            fetch(`${apiUrl}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rState),
        }));  
        
    
    return(
        <ReadStateContext.Provider value={{ getAllReadStateForUser, getAllReadStates, getReadStateById, addReadState, editReadState, readStates }} >
            {props.children}
        </ReadStateContext.Provider>
    )    
}