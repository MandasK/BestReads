import React, { useContext, useState, useEffect, useRef } from 'react';
import{ Alert, Form, FormGroup, Input, Label, Spinner, Button } from 'reactstrap';
import { ReviewContext } from '../../providers/ReviewProvider';
import { useHistory, useLocation } from 'react-router-dom';

const EditReviewForm = ({areviewId, showReviewEdit}) => {
    const { editReview, getReviewById } = useContext(ReviewContext);
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReview] = useState({});
    const newRating= useRef();
    const newContent = useRef();
    const id = areviewId;
    let location = useLocation();
    const history = useHistory();

    useEffect(() => {
        getReviewById(id)
            .then((review) => {
                setReview(review)
            })
            .then(() => setIsLoading(true))
    }, []);

    console.log(review)
    const submit = e => {
        e.preventDefault();
        const newReview = {
            Id: areviewId,
            Rating: parseInt(newRating.current.value),
            Content: newContent.current.value,
            ReadStateId: review.readState.id
        }

        editReview(newReview)
        .then(() => {
            history.push({ pathname: "/empty" });
            history.replace({ pathname: location.pathname })
        })

        if(showReviewEdit) {
            showReviewEdit(false)
        }
    }

    if(isLoading) {
        return (
            <div className="justify-content-center">
                <Form>
                    <FormGroup>
                        <Label for="newRating"> Rating</Label>
                        <Alert color="light">Number between 1-5</Alert>
                        <Input type="number"
                               defaultValue={review.rating}
                               name="newRating"
                               id="newRating"
                               innerRef={newRating}>
                               </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="newContent">Written Review</Label>
                        <Input type="textarea"
                                defaultValue={review.content}
                                name="newContent"
                                id="newContent"
                                innerRef={newContent}>
                                </Input>
                    </FormGroup>
                    <Button className="LoginButton"
                            onClick={submit}>SaveReview</Button>
                </Form>
            </div>
        )
    }
    else return <Spinner />
}

export default EditReviewForm;