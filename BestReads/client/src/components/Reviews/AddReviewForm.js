import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { ReviewContext } from '../../providers/ReviewProvider';
import { FormGroup, Spinner, Form, Label, Input, Alert, Button } from 'reactstrap';

const AddReviewForm = ({showAdd, readStateId}) => {
    const {getReadStateById, readState } = useContext(ReadStateContext);
    const { addReview } = useContext(ReviewContext);
    const [isLoading, setIsLoading]= useState(false);
    const history = useHistory();
    const id = readStateId;
    let location= useLocation();
    const content = useRef();
    const rating = useRef();


    useEffect(() => {
        getReadStateById(id)
        .then(() => setIsLoading(true))
    }, []);

    const submit = (e) => {
        e.preventDefault();

        const newReview = {
           content: content.current.value,
           rating: parseInt(rating.current.value),
           readStateId: id  
        };

        addReview(newReview)
        .then(() => {
            history.push({ pathname: "/empty" });
            history.replace({ pathname: location.pathname })
        })
        if(showAdd) {
            showAdd(false)
        }
    }

    if (isLoading) {
        return(
            <div className="justify-content-center">
                <Form>
                    <FormGroup>
                        <Label for="rating">Rating</Label>
                        <Alert color="light">Number between 1-5</Alert>
                        <Input type="number" 
                               placeholder="Enter number between 1-5"
                               name="rating" 
                               id="rating"
                               innerRef={rating}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Written Review</Label>
                        <Input type="textarea"
                                placeholder="What do you have to say?"
                                name="content"
                                id="content"
                                innerRef={content}></Input>
                    </FormGroup>
                    <Button className="LoginButton"
                            onClick={submit}>Save Review</Button>
                </Form>
            </div>
        )
    }
    else return(
        <Spinner />
    )
}

export default AddReviewForm;