import { faPray } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { useHistory, useParams } from 'react-router-dom';
import "./UserProfile.css"

const EditCurrentuserProfile = () => {
    const {currentUser, updateUser, getCurrentUser} = useContext(UserProfileContext);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState();
    const history = useHistory();
    const name = useRef();
    const displayName = useRef();
    const bio = useRef();
    const imageLocation = useRef();

    useEffect(() => {
        getCurrentUser(JSON.parse(sessionStorage.getItem("userProfile")).firebaseUserId)
        .then(() => setIsLoading(true)) 
    }, [])

    const editUser = evt => {
        evt.preventDefault();
        const updatedUser = {
            id: currentUser.id,
            firebaseUserId: currentUser.firebaseUserId,
            email: currentUser.email,
            name: name.current.value,
            displayName: displayName.current.value,
            bio: bio.current.value,
            imageLocation: imageLocation.current.value
        }

        if(updatedUser.name === "") {
            updatedUser.name = currentUser.name
        }
        if(updatedUser.displayName === "") {
            updatedUser.displayName = currentUser.displayName
        }
        if(updatedUser.bio === "") {
            updatedUser.bio = currentUser.bio
        }
        if(updatedUser.imageLocation === "") {
            updatedUser.imageLocation = currentUser.imageLocation
        }
        updateUser(updatedUser)
            .then(() => history.push('/myProfile'))
    }

    if (!currentUser) {
        return null;
    }

    return (
        <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6 editUserProfileCard">
                <CardBody className="editUserProfileCardBody">
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                className="InputBackgroundEditUser"
                                style={{background: "#FFFFF6"}}
                                id="name"
                                type="text"
                                defaultValue={currentUser.name}
                                innerRef={name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="displayName">Display Name</Label>
                            <Input 
                                className="InputBackgroundEditUser"
                                style={{background: "#FFFFF6"}}
                                id="displayName"
                                type="text"
                                defaultValue={currentUser.displayName}
                                innerRef={displayName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="bio">Bio</Label>
                            <Input 
                                className="InputBackgroundEditUser"
                                style={{background: "#FFFFF6"}}
                                id="bio"
                                type="textarea"
                                rows="5"
                                defaultValue={currentUser.bio}
                                innerRef={bio}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="imageLocation">Image URL</Label>
                            <Input 
                                className="InputBackgroundEditUser"
                                style={{background: "#FFFFF6"}}
                                id="imageLocation"
                                type="text"
                                placeholder="Enter URL for Image"
                                defaultValue={currentUser.imageLocation}
                                innerRef={imageLocation}
                            />
                        </FormGroup>
                    </Form>
                    <Button className="updateProfileButton"  onClick={editUser}>Update</Button>
                    <Button className="goBackProfileButton"  onClick={() => history.push("/myprofile")}>Cancel</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default EditCurrentuserProfile;