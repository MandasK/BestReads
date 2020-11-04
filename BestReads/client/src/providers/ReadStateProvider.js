import React, { useState, useContext, createContext } from 'react';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
import { UserProfileContext } from './UserProfileProvider';

export const ReadStateContext = createContext();

export function ReadStateProvider(props) {
    const { getToken }= useContext(UserProfileContext);
    const [readStates, setReadStates] = useState([]);
    const [toRead, setToRead] = useState([]);
    const [reading, setReading] = useState([]);
    const [read, setRead] = useState([]);
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
                .then((readStates) => {
                    setReadStates(readStates)
                }))
    };

    const getReadStateByState1 = (currentUserId) => {
        getToken().then((token) =>
        fetch(`${apiUrl}/${currentUserId}/1`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((toRead) => {
                setToRead(toRead)
            }))
            
    };

    const getReadStateByState2 = (currentUserId) => {
        getToken().then((token) =>
        fetch(`${apiUrl}/${currentUserId}/2`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((reading) => {
                setReading(reading)
            }))
            
    };

    const getReadStateByState3 = (currentUserId) => {
        getToken().then((token) =>
        fetch(`${apiUrl}/${currentUserId}/3`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((read) => {
                setRead(read)
            }))
            
    };

    const getReadStateById = (id) => {
      return getToken().then((token) =>
       fetch(`${apiUrl}/${id}/details`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json()))
    };

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
        <ReadStateContext.Provider value={{ toRead, reading, read, getAllReadStateForUser, getAllReadStates, getReadStateByState1, getReadStateByState2, getReadStateByState3, getReadStateById, addReadState, editReadState, readStates }} >
            {props.children}
        </ReadStateContext.Provider>
    ) 
       
}