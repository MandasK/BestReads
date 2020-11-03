import React, { useContext, useState } from 'react';
import { BookSearchContext } from '../../providers/BookSearchProvider';
import { Link } from 'react-router-dom';
import { Card, CardBody, Form, FormGroup, Input, Button, Table } from 'reactstrap';

const BookSearch = () => {
    const [search, setSearch] = useState("");
    const { searchBooks, books } = useContext(BookSearchContext);

    const handleFieldChange = evt => {
        const stateToChange = evt.target.value;
        setSearch(stateToChange);
    };

    const newSearch = evt => {
        searchBooks(search);
    };

    return (
        <div className="justify-content-center">
        <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:".19em", margin:"2em auto", width:"40%", borderRadius:"1.5%"}}>
            <h3 style={{fontFamily: "EB Garamond, serif", margin:".5em auto", width: "80%"}}>Enter the Name of the Book or Author you are looking for...</h3>       
        <Card style={{fontFamily: "EB Garamond, serif", margin:"2em auto", width: "80%"}}>
        <CardBody className="editUserProfileCardBody">
            <Form>
                <FormGroup>
                    <Input 
                        className="InputBackgroundEditUser"
                        style={{background: "#FFFFF6"}}
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Enter Search"
                        onChange={handleFieldChange}
                    />
                </FormGroup>
            </Form>
            <Button className="updateProfileButton"  onClick={newSearch}>Search</Button>{' '}
        </CardBody>
        </Card>
        </div>

        <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:".19em", margin:"2em auto", width:"55%", borderRadius:"1.5%"}}>
            <Table style={{width: "80%", margin: "2em auto", fontFamily: "EB Garamond, serif"}}>
                <thead>
                    <tr>
                    <th style={{background: "#FFFFF6"}}>Book Cover</th>
                    <th style={{background: "#FFFFF6"}}>Title</th>
                    <th style={{background: "#FFFFF6"}}>Author</th>
                    </tr>
                </thead>
            {books.map((book) => (
                <tbody>
                    <tr style={{background: "#FFFFF6"}}>
                        <td><Link to={`/book/${book.googleId}/details`}><img src={book.imageLocation} alt={book.title} /></Link></td>
                        <td>{book.title}</td>
                        <td>{book.authors}</td>
                    </tr>
                </tbody>
            ))}
            </Table>
            </div>
        


        </div>
    )

};

export default BookSearch;