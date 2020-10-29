import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BookSearchContext } from '../../providers/BookSearchProvider';
import { BookContext } from '../../providers/BookProvider';
import { CardHeader, Card, Spinner, CardImg, CardBody, Button, Row } from 'reactstrap';

const AddBook = () => {
    const { getSelectedBook, book } = useContext(BookSearchContext);
    const { addBook } = useContext(BookContext);
    const [isLoading, setIsLoading] = useState(false);
    const {googleId} = useParams();
    const history = useHistory();
    
    useEffect(() => {
        getSelectedBook(googleId).then(() => setIsLoading(true))
    }, []);

    let bookauthor = book.authors;
    const regex = /<[^>]*>/gi;
    let bookAbout = book.about;

    const submit = () => {
        const newBook = {
           googleId: book.googleId,
           title: book.title,
           imageLocation: book.imageLocation,
           about: book.about,
           pageCount: book.pageCount,
           publishDate: book.publishDate,
           averageRating: book.averageRating,
           ratingCount: book.ratingCount,
           authors: bookauthor
        };

        addBook(newBook).then((res) => {
            history.push(`/books/${res.id}`)
        });
    }
    
    if(!book) {
        return null;
    }
    
    if (isLoading) {
    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: "50%", margin: "5em auto" }}>
            <CardHeader style={{backgroundColor: "#FFFFF6"}}>
                    <h3>{book.title}</h3>
                </CardHeader>
                <CardImg  src={book.imageLocation} alt={book.title} />                
                <CardBody style={{backgroundColor: "#FFFFF6"}}>
                    <div>Author(s): {book.authors}</div>
                    <br></br>
                    <div>About:</div>
                    <div>
                    {bookAbout.replaceAll(regex, " ")}
                    </div>
                    <br></br>
                    <div>Page Count: {book.pageCount}</div>
                    <br></br>
                </CardBody>
                <Row>
                    <Button type="button"
                                    className="updateProfileButton"
                                    style= {{ marginLeft: "2em", marginBottom: "2em" }}
                                    onClick={e => {
                                        history.push("/books/search")
                                    }}>Go Back
                    </Button>
                    <Button type="button"
                                    className="updateProfileButton"
                                    style= {{ marginLeft: "2em", marginBottom: "2em" }}
                                    onClick={submit}
                                    >Save Book
                    </Button>
                </Row>   
            </Card>
        </div>
    )
    }
    else {
        return <Spinner className="app-spinner dark"/>
    }
}

export default AddBook;