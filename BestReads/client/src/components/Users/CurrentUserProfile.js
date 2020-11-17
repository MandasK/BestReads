import React, { useContext, useEffect, useState, } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';
import {Helmet} from "react-helmet";
import { useHistory, Link } from 'react-router-dom';
import { Card, CardImg, CardBody, Button, Row, Col, Table, Spinner } from 'reactstrap';
import "./UserProfile.css"

const CurrentUserProfile = () => {
    const { currentUser, getCurrentUser } = useContext(UserProfileContext);
    const { getReadStateByState1, getReadStateByState2, getReadStateByState3, toRead, reading, read } =useContext(ReadStateContext);
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

     //toReadList
     useEffect(() => {
        getReadStateByState1(clientuser.id)
            
    }, [])

    //readList
    useEffect(() => {
        getReadStateByState2(clientuser.id)
        
    }, []);

    //readList
    useEffect(() => {
        getReadStateByState3(clientuser.id)
        
    }, []);

    useEffect(() => {
        getUserSubscriptions(clientuser.id)
            .then((subs) => {
                setSubscriptions(subs)
            })
    }, []);

    if(!currentUser) {
        return null;
    }

    if(isloading)
    {
    return (
        <div className="justify-content-center">
            <Helmet>
                    <title>BestReads-{currentUser.displayName}</title>
                    <meta name="description" content="Details for current user." />
            </Helmet>
            <Row>
            <Card style={{ background: "#FFFFF6", border: "none", width: "40%", marginTop:"2em", marginLeft:"2em", fontFamily: "EB Garamond, serif"}} className="smallUserDetailContainer">
            <Row>
                <Col>
                {
                    currentUser.imageLocation != null ? <CardImg src={currentUser.imageLocation} alt={currentUser.name} /> : <i className="fa-user-circle fa-7x" />
                }
                </Col>
                <Col>
                <CardBody>
                    <h3>{currentUser.displayName}</h3>
                    <div>{currentUser.bio}</div>
                    <Button className="smallUserDetailContainerButton" style={{margin: "1em auto"}} onClick={() => {history.push('/myProfile/edit')}}>Edit Profile</Button>
                </CardBody>
                </Col>
            </Row>    
            </Card>
            <Col>
            <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:".19em", margin:"2em auto", width:"30%", borderRadius:"3%"}}>
            <Table style={{width: "85%", margin: "1em auto", fontFamily: "EB Garamond, serif"}}>
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                        <th> Your Friends</th>
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
            </Col>
            </Row>
            
            <Row>
                <Col>
                <div style={{background: "#EA905D", paddingTop:"2em", paddingBottom:".01em", margin:"2em auto", width:"72%", borderRadius:"10%"}}>
                    <br></br>
                <h3 style={{background: "#FFFFF6", width: "90%", margin: "0 auto", fontFamily: "EB Garamond, serif"}}>Books you want to read...</h3>
            <Table style={{width: "90%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto", fontFamily: "EB Garamond, serif"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book</th>
                    <th>Title</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {toRead.map((tr) => (
                   <tbody key={tr.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${tr.id}/details`}><img style={{height: "50px", width:"auto"}} src={tr.book.imageLocation} alt={tr.book.title}/></Link></td>
                            <td>{tr.book.title}</td>
                            <td>{tr.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </div>
            </Col>
            <Col>
            <div style={{background: "#EA905D", paddingTop:"2em", paddingBottom:".01em", margin:"2em auto", width:"72%", borderRadius:"10%"}}>
                    <br></br>
            <h3 style={{background: "#FFFFF6", width: "90%", margin: "0 auto", fontFamily: "EB Garamond, serif"}}>Books you are reading...</h3>

            <Table style={{width: "90%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto", fontFamily: "EB Garamond, serif"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book</th>
                    <th>Title</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {reading.map((rd) => (
                   <tbody key={rd.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${rd.id}/details`}><img style={{height: "50px", width:"auto"}} src={rd.book.imageLocation} alt={rd.book.title}/></Link></td>
                            <td>{rd.book.title}</td>
                            <td>{rd.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </div>
            </Col>
            <Col>
            <div style={{background: "#EA905D", paddingTop:"2em", paddingBottom:".01em", margin:"2em auto", width:"72%", borderRadius:"10%"}}>
                    <br></br>
            <h3 style={{background: "#FFFFF6", width: "90%", margin:"0 auto", fontFamily: "EB Garamond, serif"}}>Books you've already read...</h3>
            <Table style={{width: "90%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto", fontFamily: "EB Garamond, serif"}}>
            <thead style={{background: "#FFFFF6"}}>
                <tr>
                    <th>Book</th>
                    <th>Title</th> 
                    <th>Author</th>
                </tr>
            </thead>
                {read.map((r) => (
                   <tbody key={r.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/books/${r.id}/details`}><img style={{height: "50px", width:"auto"}} src={r.book.imageLocation} alt={r.book.title}/></Link></td>
                            <td>{r.book.title}</td>
                            <td>{r.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </div>
            </Col>
            </Row>
            
        </div>
    )
    }
    else {
        return <Spinner className="app-spinner dark"/>
    }
}

export default CurrentUserProfile;