import React, { useContext, useState, useEffect, useRef } from 'react';
import{ Alert, Form, FormGroup, Input, Label, Spinner, Button } from 'reactstrap';
import { ReviewContext } from '../../providers/ReviewProvider';
import { useHistory, useLocation } from 'react-router-dom';

const EditReviewForm = ({areviewId, toggle}) => {
    const { editReview, getReviewById } = useContext(ReviewContext);
    const [ready, setIsLoading] = useState(false);
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

    const submit = e => {
        e.preventDefault();
        const newReview = {
            Id: areviewId,
            Rating: parseInt(newRating.current.value),
            Content: newContent.current.value,
        }

        editReview(newReview)
        .then(getReviewById(id))
        .then(toggle)
        .then(() => {
            history.push({ pathname: "/empty" });
            history.replace({ pathname: location.pathname })
        })
    }

    if(ready) {
        return (
            <div className="justify-content-center" style={{backgroundColor: "#FFFFF6", margin:"0.5em auto", fontFamily: "EB Garamond, serif"}}>
                <Form style={{backgroundColor: "#FFFFF6", margin:"0.5em auto", fontFamily: "EB Garamond, serif"}}>
                    <FormGroup>
                        <Label for="newRating" style={{backgroundColor: "#FFFFF6",fontFamily: "EB Garamond, serif"}}> Rating</Label>
                        <Alert color="light" style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>Number between 1-5</Alert>
                        <Input type="number"
                               defaultValue={review.rating}
                               style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}
                               name="newRating"
                               id="newRating"
                               innerRef={newRating}>
                               </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="newContent" style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>Written Review</Label>
                        <Input type="textarea"
                        style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}
                                defaultValue={review.content}
                                name="newContent"
                                id="newContent"
                                innerRef={newContent}>
                                </Input>
                    </FormGroup>
                    <Button className="LoginButton"
                            onClick={submit}>Save Review</Button>
                </Form>
            </div>
        )
    }
    else return <Spinner />
}

export default EditReviewForm;