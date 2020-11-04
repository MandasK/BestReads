import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ReviewContext } from '../../providers/ReviewProvider';
import { Button } from 'reactstrap';

const DeleteReviewForm = ({areviewId, toggle}) => {
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
            //setIsLoading(false)
            //.then(() => getReviewById(id))
            .then(toggle)
                .then(() => {
                    history.push({ pathname: "/empty" });
                    history.replace({ pathname: location.pathname })
                })
        

        
    }



return(
    <>
        <div style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} className="lead mb-2">Are you sure you wish to delete your review?</div>
            <div className="text-right" style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
                <Button className="LoginButton" style={{marginLeft: "1em"}} onClick={confirmReviewDelete}>Delete</Button>
        </div>
    </>
)

}

export default DeleteReviewForm;