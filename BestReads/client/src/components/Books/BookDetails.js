import React, { useContext, useState, useEffect } from 'react';
import { ReviewContext } from '../../providers/ReviewProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { useParams, useHistory, Link } from 'react-router-dom';
import EditReadStateForm from './EditReadStateForm';
import AddReviewForm from '../Reviews/AddReviewForm';
import { Card, Modal, ModalHeader, ModalBody, CardBody, CardImg, Col, Row, Spinner, Button, Table, CardHeader } from 'reactstrap';
import comingsoon from '../../Images/comingsoon.png'
import DeleteReviewForm from '../Reviews/DeleteReviewForm';
import EditReviewForm from '../Reviews/EditReviewForm';
import Review from '../Reviews/Review';


const BookDetails = () => {
    const { getReadStateById } = useContext(ReadStateContext);
    const { getReviewsByBookId } = useContext(ReviewContext);
    const [readState, setReadState] = useState({});
    const[areviews, setAReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editModal, showEdit] = useState(false);
    const [reviewEditModal, showReviewEdit] = useState(false);
    const [addModal, showAdd] = useState(false);
    const [deleteModal, showDelete] = useState(false);
    const { readStateId } = useParams();
    const id = readStateId;
    const history = useHistory();
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));
    const editModalToggle = () => showEdit(!editModal);
    const addModalToggle = () => showAdd(!addModal);
    const editReviewToggle = () => showReviewEdit(!reviewEditModal);
    const deleteToggle = () => showDelete(!deleteModal);
    
    useEffect(() => {
        getReadStateById(readStateId)
            .then((readState) => {
                setReadState(readState)
                getReviewsByBookId(readState.book.id)
                    .then((areviews) => {
                        setAReviews(areviews)
                    })
            })
            .then(() => setIsLoading(true))
    }, []);

    const regex = /<[^>]*>/gi;

    const renderModal = (readState) => {
        return (
            <>
            <Modal style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} isOpen={editModal} toggle={editModalToggle}>
                <ModalHeader style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} toggle={editModalToggle}>Change Current Book List</ModalHeader>
                <ModalBody style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
                    <EditReadStateForm readStateId={readState.id} showEdit={showEdit} />
                </ModalBody>
            </Modal>
            <Modal isOpen={addModal} toggle={addModalToggle} style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
                <ModalHeader style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}} toggle={addModalToggle}>Add new Book Review</ModalHeader>
                <ModalBody style={{backgroundColor: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
                    <AddReviewForm readStateId={readState.id} showAdd={showAdd} />
                </ModalBody>
            </Modal>
            </>
        )
    };

    //const deleteToggle = () => showDelete(!deleteModal);
    //const editReviewToggle = () => showReviewEdit(!reviewEditModal);

    // const renderReviewModal = (areview) => {
    //     return (
    //         <>
    //             <Modal isOpen={deleteModal} toggle={deleteToggle}>
    //                 <ModalHeader>Delete Review</ModalHeader>
    //                 <ModalBody className="lead">
    //                     <DeleteReviewForm areviewId={areview.id} showDelete={showDelete} />
    //                 </ModalBody>
    //             </Modal>
    //             <Modal isOpen={reviewEditModal} toggle={editReviewToggle}>
    //                 <ModalHeader>Edit Review</ModalHeader>
    //                 <ModalBody className="lead">
    //                     <EditReviewForm  areviewId={areview.id} showReviewEdit={showReviewEdit} />
    //                 </ModalBody>
    //             </Modal>
    //         </>
    //     )

    // };

    if(!readState) {
        return null;
    }


    if(isLoading)
    {
       return(   
           <div>
            <Card style={{border:"none", width: "70%", margin:"5em auto", background: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
            <Row>
                    <Col>
                    
                    <CardHeader style={{background: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>
                    <Row>
                    {
                        readState.book.imageLocation != null ? <img style={{height:"50px", width:"auto"}} src={readState.book.imageLocation} alt={readState.book.title} /> 
                        : <img src={comingsoon} alt="coming soon" />
                    }
                    <h3 style={{marginLeft: "1em", background: "#FFFFF6", fontFamily: "EB Garamond, serif"}}>{readState.book.title}</h3>
                    </Row>
                    </CardHeader> 
                    
                    <CardBody>
                            
                            <div><strong>Pages:</strong> {readState.book.pageCount}</div>
                            <div><strong>Publish Date:</strong> {readState.book.publishDate}</div>
                            <div><strong>Author(s):</strong> {readState.book.authors}</div>
                            <br></br>
                            <div><strong>Description:</strong> {readState.book.about.replaceAll(regex, " ")}</div>
                            <br></br>
                            <div><strong>Current Book List:</strong> {readState.state.title}</div>
                            <br></br>
                            <Button className="LoginButton" onClick={() => showEdit(true)} >Change Book List</Button>
                            {readState.state.id === 3 ? <Button className="LoginButton" style={{marginLeft:"1em"}} onClick={() => showAdd(true)}>Add Review</Button> : ""}
                    </CardBody>
                    </Col>
            </Row>
            </Card>
            <h3 style={{background: "#FFFFF6", width: "75%", textAlign: "center", margin: "0 auto", fontFamily: "EB Garamond, serif"}}>Reviews</h3>
            <Table style={{width: "75%", margin: "1em auto", fontFamily: "EB Garamond, serif"}}>
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                        <th>Rating</th>
                        <th>User</th>
                        <th>Written Review</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {areviews.map((areview) => (
                    <tbody key={areview.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            
                            <Review review={areview} />
                        </tr>
                    </tbody>
                ))}
            </Table>
            
            {renderModal(readState)}
            </div>
       )
    }
    else {
    return <Spinner className="app-spinner dark"/>
     };
}

export default BookDetails;