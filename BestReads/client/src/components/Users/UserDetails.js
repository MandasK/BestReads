import React, { useContext, useEffect, useState } from 'react';
import {useParams, useHistory } from 'react-router-dom';
import { UserProfileContext} from '../../providers/UserProfileProvider';
import {SubscriptionContext} from '../../providers/SubscriptionProvider';
import { CardImg, Card, CardBody, Row, Col, Button } from 'reactstrap';

const UserDetails = (props) => {
    const { getUserById, getCurrentUser } = useContext(UserProfileContext);
    const { addSubscription, getReleventSubscriptions, unSubscribe, subscriptions } = useContext(SubscriptionContext);
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
              <Card style={{border:"none", width: "80%", margin:"5em auto", background: "#FFFFF6"}} className="smallUserDetailContainer">
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
                            !isUser && ( !isSubscribed ? <Button disabled={isLoading, isSubscribed} onClick = {(e) => {
                                        e.preventDefault()
                                        subscribe()
                                        
                                     }
                                }>Follow</Button> : <Button disabled={isLoading, !isSubscribed} onClick={(e) => {
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
        )
         

}

export default UserDetails;