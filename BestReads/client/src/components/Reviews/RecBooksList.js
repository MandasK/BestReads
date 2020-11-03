import React, { useContext, useEffect } from 'react';
import { ReviewContext } from '../../providers/ReviewProvider';
import { useHistory, Link } from 'react-router-dom';
import { Table } from 'reactstrap';

const RecBookList = () => {
    const { recBooks, getRecBooks } = useContext(ReviewContext);
    const history = useHistory();
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));

    useEffect(() => {
        getRecBooks(5, clientUser.id);
    }, [])

    return (
        <div className="justify-content-center">
            <h3 style={{background: "#FFFFF6", width: "50%", marginTop: "5em", marginLeft:"auto", marginRight:"auto"}}>Books We Recommend For You</h3>
            <Table style={{width: "50%", marginBottom: "5em", marginLeft:"auto", marginRight:"auto"}}>
                <thead style={{background: "#FFFFF6"}}>
                    <tr>
                        <th>Book Cover</th>
                        <th>Rating</th>
                        <th>Title</th>
                        <th>Authors</th>
                    </tr>
                </thead>
                {recBooks.map((rec) =>(
                    <tbody key={rec.id} style={{background: "#FFFFF6"}}>
                        <tr>
                        <td><Link to={`/books/${rec.readState.book.id}/AddState`} ><img style={{height: "50px", width:"auto"}} src={rec.readState.book.imageLocation} alt={rec.readState.book.title} /></Link></td>
                        <td>{rec.rating}</td>
                        <td>{rec.readState.book.title}</td>
                        <td>{rec.readState.book.authors}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
            
        </div>
    )

}


export default RecBookList;