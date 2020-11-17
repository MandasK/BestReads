import React, { useContext, useEffect, useState } from 'react';
import {useParams, useHistory } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { UserProfileContext} from '../../providers/UserProfileProvider';
import {SubscriptionContext} from '../../providers/SubscriptionProvider';
import { CardImg, Card, CardBody, Row, Col, Button, Table, CardHeader } from 'reactstrap';
import { ReadStateContext } from '../../providers/ReadStateProvider';

const UserDetails = (props) => {
    const { getUserById, getCurrentUser } = useContext(UserProfileContext);
    const { addSubscription, getReleventSubscriptions, unSubscribe, subscriptions } = useContext(SubscriptionContext);
    const { getReadStateByState1, getReadStateByState2, getReadStateByState3, toRead, reading, read } = useContext(ReadStateContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [aUser, setAUser] = useState({});
    const [currentSubscription, setCurrentSubscription] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))
    const newCurrentUser = parseInt(clientuser.id)
    const newId = parseInt(id);
    

    const refresh = ()=>{
       window.location.reload();
    }

     //toReadList
     useEffect(() => {
        getReadStateByState1(id)
            
    }, [])

    //readList
    useEffect(() => {
        getReadStateByState2(id)
        
    }, []);

    //readList
    useEffect(() => {
        getReadStateByState3(id)
        
    }, []);

    useEffect(() => {
        getCurrentUser(clientuser.firebaseUserId);
    }, []);

    useEffect(() => {
        getUserById(id)
        .then((aUser) => {
            setAUser(aUser)
        })
    }, []);


    useEffect(() => {
        aUser && getReleventSubscriptions(newCurrentUser, newId)
    }, [aUser]);

    

    useEffect(() => {
        if (aUser) {
            if (newCurrentUser == newId)
            {
                setIsUser(true)
            }

            subscriptions.map((subscription) => {
                if(subscription.endDateTime == null) {
                    setIsSubscribed(true)
                    setCurrentSubscription(subscription.id)
                } else if (subscription.endDateTime !== null) {
                    setIsSubscribed(false)
                    setCurrentSubscription(subscription.id)
                }
            })
        }
    }, [subscriptions, isSubscribed]);


    const subscribe = () => {
        setIsLoading(true)
        const newSubscription = {
            SubscriptionUserProfileId: newCurrentUser,
            ProviderUserProfileId: newId
        }
        addSubscription(newSubscription).then(setCurrentSubscription, setIsSubscribed(true), setIsLoading(false))
        .then(() => {
            refresh()
        })
        
    }
    
        return (
            <div>
                <Helmet>
                    <title>{`BestReads-${aUser.displayName}`}</title>
                    <meta name="description" content="Details for current user." />
            </Helmet>
                <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:"1em", margin:"2em auto", width:"40%", borderRadius:"1.5%", fontFamily: "EB Garamond, serif"}}>
                
              <Card style={{border:"none", width: "85%", margin:"1em auto", background: "#FFFFF6"}} className="smallUserDetailContainer">
                  <Row>
                  <Col>
                  <CardHeader style={{backgroundColor: "#FFFFF6"}}>
                      
                      <Row>
                  { 
                    aUser.imageLocation != null ? <img style={{width:"50px", height:"auto"}} src={aUser.imageLocation} alt={aUser.displayName} /> : <i className="fa-user-circle fa-7x" /> 
                    
                  }
                  
                  <h3>{aUser.displayName}</h3>
                  </Row>
                  
                  </CardHeader>

                  <CardBody className="smallUserDetailBodyContainer">
                  
                        <div>{aUser.bio}</div>
                        <br></br>
                        {
                            !isUser && ( !isSubscribed ? <Button className="updateProfileButton" disabled={isLoading, isSubscribed} onClick = {(e) => {
                                        e.preventDefault()
                                        subscribe()
                                        
                                     }
                                }>Follow</Button> : <Button className="updateProfileButton" disabled={isLoading, !isSubscribed} onClick={(e) => {
                                    e.preventDefault()
                                    unSubscribe(currentSubscription)
                                    .then(() =>{
                                        setIsSubscribed(false)})
                                        .then(() => {
                                            refresh()
                                        })
                                        }
                                    
                                }>UnFollow</Button>)
                        }

                  </CardBody>
                  </Col>
                  </Row>
              </Card>  
              
              </div>
              <div style={{background: "#EA905D", paddingTop:".01em", paddingBottom:".01em", margin:"2em auto", width:"72%", borderRadius:"8px"}}>         
              <h3 style={{fontFamily: "EB Garamond, serif", margin:".5em auto", width: "66%", background: "#FFFFF6", textAlign: "center"}}>{aUser.displayName}'s Books</h3>
              </div>
              <Row>
                <Col>
                <div style={{background: "#EA905D", paddingTop:"2em", paddingBottom:".01em", margin:"0 auto", width:"72%", borderRadius:"8px"}}>
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
                            <td><img style={{height: "50px", width:"auto"}} src={tr.book.imageLocation} alt={tr.book.title}/></td>
                            <td>{tr.book.title}</td>
                            <td>{tr.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </div>
            </Col>
            <Col>
            <div style={{background: "#EA905D", paddingTop:"2em", paddingBottom:".01em", margin:"0 auto", width:"72%", borderRadius:"8px"}}>    
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
                            <td><img style={{height: "50px", width:"auto"}} src={rd.book.imageLocation} alt={rd.book.title}/></td>
                            <td>{rd.book.title}</td>
                            <td>{rd.book.authors}</td>
                        </tr>
                   </tbody>
                ))}   
            </Table>
            </div>
            </Col>
            <Col>
            <div style={{background: "#EA905D", paddingTop:"2em", paddingBottom:".01em", margin:"0 auto", width:"72%", borderRadius:"8px"}}>
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
                            <td><img style={{height: "50px", width:"auto"}} src={r.book.imageLocation} alt={r.book.title}/></td>
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

export default UserDetails;