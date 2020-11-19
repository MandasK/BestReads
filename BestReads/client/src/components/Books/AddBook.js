import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { BookSearchContext } from '../../providers/BookSearchProvider';
import { BookContext } from '../../providers/BookProvider';
import { CardHeader, Card, Spinner, CardImg, CardBody, Button, Row, Col } from 'reactstrap';

const AddBook = () => {
    const { getSelectedBook, book } = useContext(BookSearchContext);
    const { addBook, abook, getBookById  } = useContext(BookContext);
    const [isLoading, setIsLoading] = useState(false);
    const {googleId} = useParams();
    const history = useHistory();
    
    useEffect(() => {
        getSelectedBook(googleId)
        .then(() => setIsLoading(true))
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
           authors: bookauthor
        };

        addBook(newBook)
        .then((res) => {
            history.push(`/books/${res.id}/Addstate`)
        });
    }
    
    if(!book) {
        return null;
    }
    
    if (isLoading) {
    return (
        <div className="d-flex justify-content-center">
            <Helmet>
                <title>BestReads-{book.title}</title>
                <meta name="description" content="Details of chosen book from book search." />
            </Helmet>
            <Card style={{ width: "71%", margin: "4em auto", backgroundColor: "#FFFFF6", border:"none" , fontFamily: "EB Garamond, serif"}}>
            <Row>        
                <Col>  
                <CardHeader style={{backgroundColor: "#FFFFF6"}}>
                    <Row>
                <img style={{height:"50px", width: "auto", marginRight: "1em"}} src={book.imageLocation} alt={book.title} />
                    <h3>{book.title}</h3>
                    </Row>
                </CardHeader>       
                <CardBody style={{backgroundColor: "#FFFFF6"}}>
                    
                    <div><strong>Author(s):</strong> {book.authors}</div>
                    <br></br>
                    <div><strong>About:</strong></div>
                    <div>
                    {bookAbout.replaceAll(regex, " ")}
                    </div>
                    <br></br>
                    <div><strong>Page Count:</strong> {book.pageCount}</div>
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
                </Col> 
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