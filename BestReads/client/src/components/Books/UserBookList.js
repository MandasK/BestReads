import React, { useContext, useEffect, useState } from 'react';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { useHistory, Link } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';

const UserBookList = () => {
    const { getReadStateByState1, getReadStateByState2, getReadStateByState3, toRead, reading, read } = useContext(ReadStateContext);
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))

    //toReadList
    useEffect(() => {
        getReadStateByState1(clientuser.id)
            
    }, [])

    console.log(toRead)

    //readList
    useEffect(() => {
        getReadStateByState2(clientuser.id)
        
    }, []);

    //readList
    useEffect(() => {
        getReadStateByState3(clientuser.id)
        
    }, []);

    return (
        <div className="justify-content-center">
            <h3 style={{background: "#FFFFF6", width: "50%", margin: "2em auto"}}>Your Books</h3>
            <Row>
                <Col>
            <Table style={{width: "50%", margin: "3em auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book List</th>
                    <th>Book</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {toRead.map((tr) => (
                   <tbody key={tr.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${tr.id}/details`}>{tr.state.title}</Link></td>
                            <td>{tr.book.title}</td>
                            <td>{tr.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </Col>
            <Col>
            <Table style={{width: "50%", margin: "3em auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book List</th>
                    <th>Book</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {reading.map((rd) => (
                   <tbody key={rd.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${rd.id}/details`}>{rd.state.title}</Link></td>
                            <td>{rd.book.title}</td>
                            <td>{rd.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </Col>
            <Col>
            <Table style={{width: "50%", margin: "3em auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book List</th>
                    <th>Book</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {read.map((r) => (
                   <tbody key={r.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${r.id}/details`}>{r.state.title}</Link></td>
                            <td>{r.book.title}</td>
                            <td>{r.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </Col>
            </Row>
        </div>
    )
}

export default UserBookList;