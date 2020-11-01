import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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

    return (
        <div className="justify-content-center">
            <Table style={{width: "50%", margin: "5em auto"}}>
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                    <th style={{background: "#FFFFF6"}}>Profile Picture</th>
                    <th style={{background: "#FFFFF6"}}>Username</th>
                    <th style={{background: "#FFFFF6"}}>Name</th>
                    </tr>
                </thead>
                {users.map((user) => (
                    <tbody key={user.id} style={{background: "#FFFFF6"}}>
                        <tr>
                            <td><Link to={`/users/${user.id}/details`}><img style={{height: "50px", width:"auto"}} src={user.imageLocation} alt={user.name} /></Link></td>
                            <td>{user.displayName}</td>
                            <td>{user.name}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
            </div>    
    )

}

export default UserList;