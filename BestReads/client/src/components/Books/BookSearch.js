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
        <Card className="col-sm-12 col-lg-6 editUserProfileCard">
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

        
            <Table style={{width: "50%", margin: "0 auto"}}>
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
    )

};

export default BookSearch;