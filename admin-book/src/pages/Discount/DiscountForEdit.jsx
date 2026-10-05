import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

function DiscountForEdit() {

    let params = useParams();
    let navigate = useNavigate();
    let id = params.id;
    let [books, setBooks] = useState([]);
    let [discount, setDiscount] = useState({
        book: '',
        discountName: '',
        discountType: '',
        discountValue: 0,
        validFrom: '',
        validTo: ''
    });

    // Get existing discount data
    useEffect(() => {

        axios({
            url: apiUrl + '/discount/for/edit/' + id,
            method: 'get'
        })
        .then((res) => {
            setDiscount(res.data.data);
            setBooks(res.data.books);
        })
        .catch((err) => {
            alert(err);
        });

    }, [id]);


    
    function manageUpdate(e) {

        let name = e.target.name;
        let value = e.target.value;

        setDiscount((prev) => {

            return {
                ...prev,
                [name]: value
            };

        });
    }


    
    function editDiscount() {

        axios({
            url: apiUrl + '/edit/discount/' + id,
            method: 'put',
            data: discount
        })
        .then((res) => {

            alert("Discount has been updated successfully...");

            navigate('/discount');

        })
        .catch((err) => {

            console.log(err);
            alert(err);

        });
    }


    return (
        <Container className="align-items-center justify-content-center min-vh-100">

            <Row className="w-100 justify-content-center">

                <Col
                     xs={12}
                     md={6}
                     lg={6}
                    className="border p-4 rounded bg-white mt-5"
                >

                    <h3 className="text-center text-danger">
                        Edit Discount
                    </h3>

                    <Form>

                        {/* Discount Name */}
                       
                        <Row>
                                        <Col>
                                        <Form.Group>
                                            <Form.Label>Select Book</Form.Label>
                                            <Form.Select name="book" value={discount.book} onChange={manageUpdate}>
                                                {
                                                    books.map((book)=>
                                                        <option key={book._id} value={book._id}>{book.bookTittle || book.bookTitle}</option>
                                                    
                                                    )
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                     {/* Discount Name */}
                                     <Form.Group className="mb-3">
                            <Form.Label>
                                Discount Name
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="discountName"
                                value={discount.discountName}
                                onChange={manageUpdate}
                            />
                        </Form.Group>
                        {/* Discount Type */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Discount Type
                            </Form.Label>
                            
                            <Form.Select  name="discountType" value={discount.discountType} onChange={manageUpdate}>
                        <option value="Percentage">Percentage</option> 
                        <option value="Fixed">Fixed</option>
                    </Form.Select>

                        </Form.Group>


                        {/* Discount Value */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Discount Value
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="discountValue"
                                value={discount.discountValue}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Valid From */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Valid From
                            </Form.Label>

                            <Form.Control
                                type="date"
                                name="validFrom"
                                value={discount.validFrom.split('T')[0]}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Valid To */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Valid To
                            </Form.Label>

                            <Form.Control
                                type="date"
                                name="validTo"
                                value={discount.validTo.split('T')[0]}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        <Button
                            variant="danger"
                            className="mt-3"
                            onClick={editDiscount}
                        >
                            Edit Discount
                        </Button>

                    </Form>

                </Col>

            </Row>

        </Container>
    );
}

export default DiscountForEdit;