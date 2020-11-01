import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ReviewContext } from '../../providers/ReviewProvider';
import { Button } from 'reactstrap';

const DeleteReviewForm = ({areviewId, showDelete}) => {
    const {getReviewById, deleteReview } = useContext(ReviewContext);
    const[isLoading, setIsLoading] = useState(false);
    const [review, setReview] = useState({});
    const id = areviewId;
    let location = useLocation();
    const history = useHistory();

    useEffect(() => {
        getReviewById(id)
        .then((review) => {
            setReview(review)
        })
        .then(() => setIsLoading(true))
    }, [])

    const confirmReviewDelete = e => {
        e.preventDefault();

        deleteReview(areviewId)
        .then(() => {
            history.push({ pathname: "/empty" });
            history.replace({ pathname: location.pathname })
        })

        if(showDelete) {
            showDelete(false)
        }
    }



return(
    <>
        <div className="lead mb-2">Are you sure you wish to delete your review?</div>
            <div className="text-right">
                <Button onClick={() => showDelete(false)}>Cancel</Button>
                <Button onClick={confirmReviewDelete}>Delete</Button>
        </div>
    </>
)

}

export default DeleteReviewForm;