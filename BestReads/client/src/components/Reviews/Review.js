import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import EditReviewForm from './EditReviewForm';
import DeleteReviewForm from './DeleteReviewForm';

const Review = ({ review }) => {
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));
    const [reviewEditModal, showReviewEdit] = useState(false);
    const [deleteModal, showDelete] = useState(false);
    const editReviewToggle = () => showReviewEdit(!reviewEditModal);
    const deleteToggle = () => showDelete(!deleteModal);

    return (
        <>
        <td>{review.rating}</td>
        <td>{review.readState.user.displayName}</td>
        <td>{review.content}</td>
        <td>{review.readState.user.id == clientUser.id ? <Button className="LoginButton" onClick={() => showReviewEdit(true)}>Edit</Button> : ""}</td>
        <td>{review.readState.user.id == clientUser.id ? <Button className="LoginButton" onClick={() => showDelete(true)}>Delete</Button> : ""}</td>

        <Modal isOpen={deleteModal} toggle={deleteToggle}>
                    <ModalHeader style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} toggle={deleteToggle}>Delete Review</ModalHeader>
                    <ModalBody style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} className="lead">
                        <DeleteReviewForm areviewId={review.id} toggle={deleteToggle} />
                    </ModalBody>
                </Modal>
                <Modal style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} isOpen={reviewEditModal} toggle={editReviewToggle}>
                    <ModalHeader style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} toggle={editReviewToggle}>Edit Review</ModalHeader>
                    <ModalBody style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} className="lead">
                        <EditReviewForm  areviewId={review.id} toggle={editReviewToggle} />
                    </ModalBody>
                </Modal>
        </>
    )

}

export default Review;