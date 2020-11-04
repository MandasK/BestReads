import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BookContext } from '../../providers/BookProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { CardHeader, Card, CardImg, CardBody, Spinner, Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap';

const AddReadBookState = () => {
    const { getBookById } = useContext(BookContext);
    const { addReadState } = useContext(ReadStateContext);
    const [isLoading, setIsLoading] = useState(false);
    const [abook, setABook] = useState({});
    const { id } = useParams();
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))
    const newCurrentUser = parseInt(clientuser.id);
    const [stateId, setStateid] = useState();
    

    

    useEffect(() => {
        getBookById(id)
        .then(setABook)
        .then(() => setIsLoading(true))
    }, [])


    const regex = /<[^>]*>/gi;
    let bookAbout = abook.about;

    const submit = () => {
        const readState = {
            stateId: parseInt(stateId),
            userId: newCurrentUser,
            bookId: abook.id
        }

        addReadState(readState).then((res) => {
            history.push(`/myProfile/`)
        })
    };

    if(!abook) {
        return null;
    }

    if(isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <Card style={{width: "75%", margin: "5em auto", backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
                    <Row>
                    <Col>
                    <CardHeader style={{backgroundColor: "#FFFFF6"}}>
                        <Row>
                    <img style={{height:"50px", width: "auto", marginRight: "1em"}} src={abook.imageLocation} alt={abook.title} />
                        <h3>{abook.title}</h3>
                        </Row>
                    </CardHeader>
                    <CardBody style={{backgroundColor: "#FFFFF6"}}>
                    <div><strong>Author(s):</strong> {abook.authors}</div>
                    <br></br>
                    <div><strong>About:</strong></div>
                    <div>
                    {bookAbout.replaceAll(regex, " ")}
                    </div>
                    <br></br>
                    <div><strong>Page Count:</strong> {abook.pageCount}</div>
                    <br></br>  
                    </CardBody>
                    <Form style={{backgroundColor: "#FFFFF6", margin:"0.5em auto", fontFamily: "EB Garamond, serif"}}>
                        <FormGroup style={{backgroundColor: "#FFFFF6", marginLeft:"1em"}}>
                            <Label style={{backgroundColor: "#FFFFF6", marginLeft:"1em"}} for="stateId"><strong>What Book List Should I Add This to?</strong></Label>
                            <select style={{backgroundColor: "#FFFFF6", width:"35%", marginLeft:"1em"}}
                                    name="stateId"
                                    id="stateId"
                                    className="form-control"
                                    onChange={(e) => setStateid(e.target.value)}>
                                <option defaultValue="Please choose an option" hidden></option>        
                                <option value="1">Want to Read</option>
                                <option value="2">Currently Reading</option>
                                <option value="3">Already Read</option>
                            </select>
                        </FormGroup>
                    </Form>
                    <Button style={{marginLeft: "2.5em", marginBottom:"2em", }} className="LoginButton" onClick={submit}>Save to Books</Button>
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

export default AddReadBookState;