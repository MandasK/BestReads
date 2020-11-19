import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { Table } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';

const UserList = (props) => {
    const { users, getAllUsers, currentUser, getCurrentUser } = useContext(UserProfileContext);
    const history = useHistory();
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));

    useEffect(() => {
        getCurrentUser(clientUser.firebaseUserId);
    }, []);

    useEffect(() => {
        getAllUsers();
    }, []);

    //need to pull in all active subscriptions to current user to only display users that current user is not friends with. will need to map through current user's subscriptions to see if it matches any user ids to have them not display.

    return (
        <div style={{background: "#EA905D", paddingTop:"1em", paddingBottom:"1em", margin:"2em auto", width:"66%", borderRadius:"1em"}}>
            <Helmet>
            <title>BestReads-FInd Other Book Lovers</title>
            <meta name="description" content="List of users on BestReads" />
        </Helmet>
            <h3 style={{fontFamily: "EB Garamond, serif", margin:".5em auto", width: "80%"}}>Select a book lover's profile to find out more about them, and follow them...</h3> 
            <Table style={{width: "80%", margin: "1em auto", fontFamily: "EB Garamond, serif"}}>
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                    <th style={{background: "#FFFFF6"}}>Profile Picture</th>
                    <th style={{background: "#FFFFF6"}}>Username</th>
                    <th style={{background: "#FFFFF6"}}>Name</th>
                    </tr>
                </thead>
                {users.map((user) => (
                    <tbody key={user.id} style={{background: "#FFFFF6"}}>
                        {user.id !== clientUser.id ?
                        <tr>
                            <td><Link to={`/users/${user.id}/details`}><img style={{height: "50px", width:"auto"}} src={user.imageLocation} alt={user.name}/></Link></td>
                            <td>{user.displayName}</td>
                            <td>{user.name}</td>
                        </tr> : ""}
                    </tbody>
                ))}
            </Table>
            </div>    
    )

}

export default UserList;