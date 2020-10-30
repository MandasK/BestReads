import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BookContext } from '../../providers/BookProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { CardHeader, Card, CardImg, CardBody } from 'reactstrap';

const AddReactBookState = () => {
    const { aBook, getBookById } = useContext(BookContext);
    const { addReadState } = useContext(ReadStateContext);
    const {isLoading, setIsLoading} =useState(false);
    const { id } = useParams();
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))
    const newCurrentUser = parseInt(clientuser.id);


    const stateId = useRef();

    useEffect(() => {
        getBookById(id).then(() => setIsLoading(true))
    }, []);

    const regex = /<[^>]*>/gi;
    let bookAbout = aBook.about;

    const submit = () => {
        const readState = {
            stateId: parseInt(stateId.current.id),
            userId: newCurrentUser,
            bookId: aBook.id
        }

        addReadState(readState).then((res) => {
            history.push(`/myProfile/${res.userId}`)
        })
    };

    if(isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <Card style={{width: "60%", margin: "5em auto"}}>
                    <CardHeader style={{backgroundColor: "#FFFFF6"}}>
                        <h3>{aBook.title}</h3>
                    </CardHeader>
                    <CardImg  src={aBook.imageLocation} alt={aBook.title} />
                    <CardBody style={{backgroundColor: "#FFFFF6"}}>
                    <div>Author(s): {aBook.authors}</div>
                    <br></br>
                    <div>About:</div>
                    <div>
                    {bookAbout.replaceAll(regex, " ")}
                    </div>
                    <br></br>
                    <div>Page Count: {aBook.pageCount}</div>
                    <br></br>  
                    </CardBody>
                </Card>

            </div>
        )
    }




}

export default AddReactBookState;