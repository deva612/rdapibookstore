import axios from 'axios'
import { useState ,useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
const apiUrl = import.meta.env.VITE_API_URL;
function UsersList() {
    let [users,setUsers] = useState([])
    useEffect(()=>{
        axios({
            url: apiUrl + '/users',
            method: 'get'
        }).then((res)=>{
                const responseUsers = Array.isArray(res.data) ? res.data : res.data?.data;
                setUsers(Array.isArray(responseUsers) ? responseUsers : []);
        }).catch((err)=>{
            alert(err)
        })  
    },[])
return (
    <Container>
        <Row>
            <Col>
            <h2 className='text-danger text-center'>Users List</h2>
            <Table bordered>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th> Status</th>
                        <th>Action</th>
                    </tr>
                     </thead>
                   <tbody>
                    {
                        (Array.isArray(users) ? users : []).map((user)=>
                        <tr>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
    <span className={user.status === "Active" ? "badge bg-success" : "badge bg-success"}>
        {user.status}
    </span>
</td>
                        </tr>
                        )
                    }
                   </tbody>
               
            </Table>
            </Col>
        </Row>
    </Container>
   
)
}
export default UsersList