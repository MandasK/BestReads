import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [name, setName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Try again.");
    } else {
      const userProfile = { name, email, displayName, bio, imageLocation };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">User Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" type="text" onChange={e => setBio(e.target.value)} />
        </FormGroup> 
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup></FormGroup>
        <FormGroup>   
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}