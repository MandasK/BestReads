import React, { useContext, useState } from 'react';
import { BookSearchContext } from '../../providers/BookSearchProvider';
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
        <div className="row justify-content-center">
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

        <div>
            <Table>
                <thead>
                    <th>Book Cover</th>
                    <th>Title</th>
                    <th>Author</th>
                </thead>
            {books.map((book) => (
                <tbody key={book.id}>
                    <tr>
                        <td><img src={book.imageLocation} alt={book.title} /></td>
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