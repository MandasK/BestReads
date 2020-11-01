import React, { useContext, useState, useEffect } from 'react';
import { Spinner, Button, Form, FormGroup, Label } from 'reactstrap';
import { ReadStateContext } from '../../providers/ReadStateProvider';
import { useHistory, useLocation } from 'react-router-dom';

const EditReadStateForm = ({showEdit, readStateId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { editReadState, getReadStateById } = useContext(ReadStateContext);
    const [readState, setReadState] = useState({});
    const [newStateId, setNewStateId] = useState();
    const id = readStateId;
    let location = useLocation();
    const history = useHistory();

    useEffect(() => {
        getReadStateById(id)
        .then((readState) => {
            setReadState(readState)
        })
        .then(() => setIsLoading(true))
    }, [])

    const submit = e => {
        e.preventDefault();
        const newReadState = {
            id: readState.id,
            stateId: parseInt(newStateId)
        }

        editReadState(newReadState)
        .then(() => {
            history.push({ pathname: "/empty" });
            history.replace({ pathname: location.pathname })
        })

        if(showEdit) {
            showEdit(false)
        }
    }

    if(isLoading) {
        return (
        <div className="justify-content-center">
            <Form>
                <FormGroup>
                    <Label for="newStateId">What Book List Should I Add This to?</Label>
                        <select 
                                name="newStateId"
                                id="newStateId"
                                 className="form-control"
                                onChange={(e) => setNewStateId(e.target.value)}>
                                    <option defaultValue={readState.state.id} hidden>{readState.state.title}</option>
                                    <option value="1">Plan to Read</option>
                                    <option value="2">Currently Reading</option>
                                    <option value="3">Already Read</option>
                        </select>
                        
                        <Button style={{marginTop: ".5em"}} className="LoginButton" onClick={submit}>Change List</Button>
                </FormGroup>
            </Form>
                
        </div>
        )
    }
    else return <Spinner />
}

export default EditReadStateForm;