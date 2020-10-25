import React, { useContext, useEffect, useState, } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { useHistory, Link } from 'react-router-dom';
import { Card, CardImg, CardBody, Button, Row, Col } from 'reactstrap';
import "./UserProfile.css"

const CurrentUserProfile = () => {
    const { currentUser, getCurrentUser, getUserById } = useContext(UserProfileContext);
    const [isloading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getCurrentUser(JSON.parse(sessionStorage.getItem("userProfile")).firebaseUserId)
        .then(() => setIsLoading(true))
    }, []);

    console.log(currentUser);

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
        </div>
    )
}

export default CurrentUserProfile;