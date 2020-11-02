import React, { useContext, useEffect, useState } from 'react';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { useHistory, Link } from 'react-router-dom';
import { Table } from 'reactstrap';

const UserBookList = () => {
    const { getAllReadStateForUser, readStates } = useContext(ReadStateContext);
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))

    useEffect(() => {
        getAllReadStateForUser(clientuser.id)
    })

    return (
        <div className="justify-content-center">
            <h3 style={{background: "#FFFFF6", width: "50%", margin: "2em auto"}}>Your Books</h3>
            <Table style={{width: "50%", margin: "3em auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book List</th>
                    <th>Book</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {readStates.map((readState) => (
                   <tbody key={readState.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${readState.id}/details`}>{readState.state.title}</Link></td>
                            <td>{readState.book.title}</td>
                            <td>{readState.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
        </div>
    )
}

export default UserBookList;