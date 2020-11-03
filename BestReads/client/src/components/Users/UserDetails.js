import React, { useContext, useEffect, useState } from 'react';
import {useParams, useHistory } from 'react-router-dom';
import { UserProfileContext} from '../../providers/UserProfileProvider';
import {SubscriptionContext} from '../../providers/SubscriptionProvider';
import { CardImg, Card, CardBody, Row, Col, Button, Table } from 'reactstrap';
import { ReadStateContext } from '../../providers/ReadStateProvider';

const UserDetails = (props) => {
    const { getUserById, getCurrentUser } = useContext(UserProfileContext);
    const { addSubscription, getReleventSubscriptions, unSubscribe, subscriptions } = useContext(SubscriptionContext);
    const { getAllReadStateForUser, readStates } = useContext(ReadStateContext);
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

    useEffect(() => {
        getAllReadStateForUser(id)
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
                <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:"1em", margin:"2em auto", width:"40%", borderRadius:"1.5%", fontFamily: "EB Garamond, serif"}}>
              <Card style={{border:"none", width: "85%", margin:"1em auto", background: "#FFFFF6"}} className="smallUserDetailContainer">
                  <Row>
                      <Col>
                  { 
                    aUser.imageLocation != null ? <CardImg style={{width:"60%", height:"auto"}} src={aUser.imageLocation} alt={aUser.displayName} /> : <i className="fa-user-circle fa-7x" /> 
                  }
                  </Col>
                  <CardBody className="smallUserDetailBodyContainer">
                  <Col>
                        <h3>{aUser.displayName}</h3>
                        <div>{aUser.bio}</div>
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
                  </Col>
                  </CardBody>
                  </Row>
              </Card>  
              </div>
                     
              <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:"1em", margin:"2em auto", width:"66%", borderRadius:"1.5%"}}>
              <h3 style={{fontFamily: "EB Garamond, serif", margin:".5em auto", width: "66%"}}>{aUser.displayName}'s Books</h3>
              <Table style={{width: "80%", margin: "1em auto", fontFamily: "EB Garamond, serif"}}>
                  <thead style={{background: "#FFFFF6"}}>
                      <tr>
                          <td>Book Cover</td>
                          <td>Title</td>
                          <td>Author(s)</td>
                      </tr>
                  </thead>
                  {readStates.map((rs) => (
                      <tbody key={rs.id} style={{background: "#FFFFF6"}}>
                      <tr>
                          <td><img style={{height: "50px", width:"auto"}} src={rs.book.imageLocation} alt={rs.book.title}/></td>
                          <td>{rs.book.title}</td>
                          <td>{rs.book.authors}</td>
                      </tr>
                      </tbody>
                  ))}
              </Table>
              </div>
            </div>
        )
         

}

export default UserDetails;