import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ReviewContext } from '../../providers/ReviewProvider';
import {  } from 'reactstrap';

const DeleteReviewForm = ({areview, showDelete}) => {
    const {getReviewById, review} = useContext(ReviewContext);
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