import React, { useContext, useEffect, useState } from 'react';
import {useParams, useHistory } from 'react-router-dom';
import { UserProfileContext} from '../../providers/UserProfileProvider';
import {SubscriptionContext} from '../../providers/SubscriptionProvider';
import { CardImg, Spinner, Card, CardBody, Row, Col, Button } from 'reactstrap';

const UserDetails = () => {
    const { getUserById, getCurrentUser, currentuser, aUser } = useContext(UserProfileContext);
    const { addSubscription, getReleventSubscriptions, unSubscribe, subscriptions } = useContext(SubscriptionContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [currentSubscription, setCurrentSubscription] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const clientuser = JSON.parse(sessionStorage.getItem('userProfile'))
    const newCurrentUser = parseInt(clientuser.id)
    const newId = parseInt(id);
    useEffect(() => {
        getCurrentUser(clientuser.firebaseUserId);
    }, []);

    useEffect(() => {
        getUserById(id)
        .then(() => setIsLoading(true))
    }, []);

    console.log(newId)
    console.log(newCurrentUser);

    useEffect(() => {
        getReleventSubscriptions(newCurrentUser, newId)
    }, []);

    

    useEffect(() => {
        if (aUser) {
            if (clientuser.id == aUser.id)
            {
                setIsUser(true)
            }

            subscriptions.map((subscription) => {
                if(subscription.endDateTime == null) {
                    setIsSubscribed(true)
                    setCurrentSubscription(subscription)
                } else if (subscription.endDateTime !== null) {
                    setIsSubscribed(false)
                    setCurrentSubscription(subscription)
                }
            })
        }
    }, [subscriptions, isSubscribed]);

    const subscribe = () => {
        setIsLoading(true)
        const subscription = {
            SubscriptionUserProfileId: clientuser.id,
            ProviderUserProfileId: aUser.id
        }
        addSubscription(subscription).then(setCurrentSubscription, setIsSubscribed(true), setIsLoading(false))
    }

    if(aUser === undefined || subscriptions === undefined) {
        return null;
    }

    if(isLoading) {
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
                            !isUser && ( !isSubscribed ? <Button disabled={isLoading, isSubscribed} onClick = { (e) => {
                                e.preventDefault()
                                subscribe()
                            }
                        }>Follow</Button> : <Button disabled={isLoading, !isSubscribed} onClick={(e) => {
                            e.preventDefault()
                            setIsLoading(true)
                            unSubscribe(currentSubscription).id.then(setIsSubscribed(false), setIsLoading(false))
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
    else {
        return <Spinner className="app-spinner dark" />
    }


}

export default UserDetails;