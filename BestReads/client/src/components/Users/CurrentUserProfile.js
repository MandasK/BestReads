import React, { useContext, useEffect, useState, } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { useHistory } from 'react-router-dom';
import { Card, CardImg, CardBody, Button, Row, Col, Table } from 'reactstrap';
import "./UserProfile.css"

const CurrentUserProfile = () => {
    const { currentUser, getCurrentUser } = useContext(UserProfileContext);
    const { getAllReadStateForUser, readStates } =useContext(ReadStateContext);
    const [isloading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getCurrentUser(JSON.parse(sessionStorage.getItem("userProfile")).firebaseUserId)
        .then(() => setIsLoading(true))
    }, []);

    useEffect(() => {

    })

    if(!currentUser) {
        return null;
    }

    return (
        <div>
            <Card style={{ border: "none", width: "30%", height:"50%"}} className="smallUserDetailContainer">
                <Row>
                    <Col>
                {
                    currentUser.imageLocation != null ? <CardImg src={currentUser.imageLocation} alt={currentUser.name} /> : <i className="fa-user-circle fa-7x" />
                }
                </Col>
                <CardBody className="smallUserDetailBodyContainer">
                <Col>
                    <h3>{currentUser.displayName}</h3>
                    <div>{currentUser.bio}</div>
                    <Button className="smallUserDetailContainerButton" onClick={() => {history.push('/myProfile/edit')}}>Edit Profile</Button>
                </Col>
                </CardBody>
                </Row>
            </Card>
            <Table>
                <thead>
                    <tr>
                       <th>Book List</th>
                       <th>Book</th> 
                       <th>Author</th>
                    </tr>
                </thead>
                {}
                
            </Table>
        </div>
    )
}

export default CurrentUserProfile;