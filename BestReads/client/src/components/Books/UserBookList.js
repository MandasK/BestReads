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
            <Row>
                <Col>
                <h3 style={{background: "#FFFFF6", width: "90%", margin: "0 auto"}}>Books you want to read...</h3>
            <Table style={{width: "90%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book</th>
                    <th>Title</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {toRead.map((tr) => (
                   <tbody key={tr.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${tr.id}/details`}><img style={{height: "50px", width:"auto"}} src={tr.book.imageLocation} alt={tr.book.title}/></Link></td>
                            <td>{tr.book.title}</td>
                            <td>{tr.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </Col>
            <Col>
            <h3 style={{background: "#FFFFF6", width: "90%", margin: "0 auto"}}>Books you are reading...</h3>
            <Table style={{width: "90%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book</th>
                    <th>Title</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {reading.map((rd) => (
                   <tbody key={rd.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${rd.id}/details`}><img style={{height: "50px", width:"auto"}} src={rd.book.imageLocation} alt={rd.book.title}/></Link></td>
                            <td>{rd.book.title}</td>
                            <td>{rd.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            
            </Col>
            <Col>
            <h3 style={{background: "#FFFFF6", width: "90%", margin:"0 auto"}}>Books you've already read...</h3>
            <Table style={{width: "90%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book</th>
                    <th>Title</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {read.map((r) => (
                   <tbody key={r.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${r.id}/details`}><img style={{height: "50px", width:"auto"}} src={r.book.imageLocation} alt={r.book.title}/></Link></td>
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