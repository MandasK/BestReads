import React, { useContext, useEffect, useState, } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';
import { useHistory, Link } from 'react-router-dom';
import { Card, CardImg, CardBody, Button, Row, Col, Table, Spinner } from 'reactstrap';
import "./UserProfile.css"

const CurrentUserProfile = () => {
    const { currentUser, getCurrentUser } = useContext(UserProfileContext);
    const { getAllReadStateForUser, readStates } =useContext(ReadStateContext);
    const { getUserSubscriptions } = useContext(SubscriptionContext);
    const [isloading, setIsLoading] = useState(false);
    const [subs, setSubscriptions] = useState([]);
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))
    const newCurrentUser = parseInt(clientuser.id)

    useEffect(() => {
        getCurrentUser(JSON.parse(sessionStorage.getItem("userProfile")).firebaseUserId)
        .then(() => setIsLoading(true))
    }, []);

    useEffect(() => {
        getAllReadStateForUser(clientuser.id)
    }, []);

    useEffect(() => {
        getUserSubscriptions(clientuser.id)
            .then((subs) => {
                setSubscriptions(subs)
            })
    }, []);
    console.log(subs)

    if(!currentUser) {
        return null;
    }

    if(isloading)
    {
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
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                       <th>Book List</th>
                       <th>Book</th> 
                       <th>Author</th>
                    </tr>
                </thead>
                {readStates.map((readState) => (
                   <tbody key={readState.id} style={{background: "#FFFFF6"}}>
                   <tr>
                       <td><Link to={`/books/${readState.id}/details`}>{readState.state.title}</Link></td>
                       <td>{readState.book.title}</td>
                       <td>{readState.book.authors}</td>
                   </tr>
               </tbody>
                ))}
                
            </Table>
            <Table>
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                        <th>Friends</th>
                    </tr>
                </thead>
                {subs.map((sub) => (
                    <tbody key={sub.id} style={{background: "#FFFFF6"}}>
                        <tr>
                        <td><Link to={`/users/${sub.providerUserProfileId}/details`}>{sub.subscribeeUser.displayName}</Link></td> 
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    )
    }
    else {
        return <Spinner className="app-spinner dark"/>
    }
}

export default CurrentUserProfile;