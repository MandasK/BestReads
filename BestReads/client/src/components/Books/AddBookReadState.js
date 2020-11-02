import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BookContext } from '../../providers/BookProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { CardHeader, Card, CardImg, CardBody, Spinner, Form, FormGroup, Input, Label, Button } from 'reactstrap';

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
                <Card style={{width: "60%", margin: "5em auto"}}>
                    <CardHeader style={{backgroundColor: "#FFFFF6"}}>
                        <h3>{abook.title}</h3>
                    </CardHeader>
                    <CardImg  src={abook.imageLocation} alt={abook.title} />
                    <CardBody style={{backgroundColor: "#FFFFF6"}}>
                    <div>Author(s): {abook.authors}</div>
                    <br></br>
                    <div>About:</div>
                    <div>
                    {bookAbout.replaceAll(regex, " ")}
                    </div>
                    <br></br>
                    <div>Page Count: {abook.pageCount}</div>
                    <br></br>  
                    </CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="stateId">What Book List Should I Add This to?</Label>
                            <select defaultValue=""
                                    name="stateId"
                                    id="stateId"
                                    className="form-control"
                                    onChange={(e) => setStateid(e.target.value)}>
                                <option value="1">Want to Read</option>
                                <option value="2">Currently Reading</option>
                                <option value="3">Already Read</option>
                            </select>
                        </FormGroup>
                    </Form>
                    <Button className="LoginButton" onClick={submit}>Save to Books</Button>
                </Card>

            </div>
        )
    }
    else {
        return <Spinner className="app-spinner dark"/>
    }

}

export default AddReadBookState;