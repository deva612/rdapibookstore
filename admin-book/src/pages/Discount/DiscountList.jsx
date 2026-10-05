import { useNavigate } from "react-router-dom"
import { Button, Container ,Row, Col, Form, FormGroup, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios"

function DiscountList(){
    let [discounts,setDiscounts] = useState([])
    const navigate = useNavigate()
         function goToAddDiscount(){
            navigate('/add/discount')
         }
      function goForEdit(id){
        navigate('/edit/discount/' + id)
      }   
useEffect(()=>{
    axios({
        url: apiUrl + '/discount',
        method: 'get'
    }).then((res)=>{
        setDiscounts(res.data.data)
    }).catch((err)=>{
        alert(err)
    })
},[])
    return (
            <Container>
                <Row>
                    <Col>
                    <Form>
                        <FormGroup>
                            <Form.Control type="text" placeholder="type of book name to search">

                            </Form.Control>
                        </FormGroup>
                    </Form>
                    <Button className="mt-5" variant="success" style={{ float: 'right' }} onClick={() => navigate('/add/Discount')}>
                        Add Discount
                    </Button>
                    </Col>
                </Row>
                <Row>
                    <h3 className="mt-2 text-center text-danger" >Discount List</h3>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Discount Name</th>
                                <th>Discount Type</th>
                               <th>Discount Value</th>
                               <th>Book Name</th> 
                               <th> Valid From</th>
                               <th> Valid To</th>
                              <th> Status</th> 
                              <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                discounts.map((discount)=>
                                    <tr>
                                       <td> {discount.discountName}</td>
                                       <td> {discount.discountType}</td>
                                       <td> {discount.discountValue}</td>
                                       <td> {discount.book?.bookTittle}</td>
                                       <td>{new Date(discount.validFrom).toLocaleDateString()}</td>
                                       <td>{new Date(discount.validTo).toLocaleDateString()}</td>
                                       {/* <td>{discount.status}</td> */}
                                       <td className={discount.status === "Active" ? "text-success" : "text-danger"}>{discount.status}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={()=> goForEdit(discount._id)}><i className="bi bi-pencil"></i></Button>
                                    </td>
                                    </tr>
                                    
                                )
                            }
                        </tbody>

                    </Table>
                </Row>
            </Container>
    )
}
export default DiscountList