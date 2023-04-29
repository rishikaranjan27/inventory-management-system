import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import axios from 'axios'
import { baseUrl } from '../Lib'
import '../CSS/Edit.css'
import { Sidebar } from '../Components/Sidebar';





export const Edit = () => {


    const navigate = useNavigate();


    //Fetch product id from url

    const params = useParams();
    const {id} = params;


    //Input fields to edit a product

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productWeight, setProductWeight] = useState("");
    const [productLength, setProductLength] = useState("");
    const [productBreadth, setProductBreadth] = useState("");
    const [productDepth, setProductDepth] = useState("");
    const [price, setPrice] = useState("");




    //Send edit request to server through axios

    const editHandler = async () => {

        try {

            const {data} = await axios.put(
                `${baseUrl}/api/inventory/${id}`,
                {
                    productName : productName,
                    productDesc: productDesc,
                    category: category,
                    quantity : quantity,
                    productWeight : productWeight,
                    productLength : productLength,
                    productBreadth : productBreadth,
                    productDepth : productDepth,
                    price : price,

                  
                }
            )

            console.log(`Product ${id} updated: `, data);

            //Upon creating new product redirect to home page
            navigate('/');

        }

        catch(err) {
            console.log(err);
        }

    }



    //Retrieve current product details

    const getProductData = async () => {

        try {

            const {data} = await axios.get(
                `${baseUrl}/api/inventory/${id}`
            )

            setProductId(data._id);
            setProductName(data.productName);
            setProductDesc(data.productDesc);
            setCategory(data.category);
            setQuantity(data.quantity);
            setProductWeight(data.productWeight);
            setProductLength(data.productLength);
            setProductBreadth(data.productBreadth);
            setProductDepth(data.productDepth);
            setPrice(data.price);

            console.log(`Product ${id} existing data`, data);
        }

        catch(err) {
            console.log(err);
        }

    }




    useEffect(() => {

        getProductData();

    }, []);




    return (
        <div className="edit">

            <div className='edit-sidebar'>
                <Sidebar/>
            </div>



            <div>

                <div className='edit-title'>

                    <div>Product Id</div>

                    <div>{productId}</div>

                </div>

                <div className="edit-main">


                <div className='edit-main-left'>

                

                    <div>
                        <div>Description</div>

                        <div className='edit-border'>
                            <div>
                            <label>Product Name</label>
                            <input type='text' placeholder={productName}
                            onChange={(e) => {
                                setProductName(e.target.value);
                            }}/>
                            </div>

                            <div>
                            <label>Product Description</label>
                            <input type='text' placeholder={productDesc}
                            onChange={(e) => {
                                setProductDesc(e.target.value);
                            }}/>
                            </div>
                        </div>
                    </div>



                    <div>
                        <div>Category</div>

                        <div className='edit-border'>

                            <div>
                            <label>Product Category</label>
                            <input type='text' placeholder={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}/>
                            </div>

                        </div>
                    </div>




                    <div>
                        <div>Inventory</div>

                        <div className='edit-border'>

                            <div>
                            <label>Quantity</label>
                            <input type='number' placeholder={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }}/>
                            </div>

                        </div>
                    </div>


                </div>


                <div className='edit-main-right'>

                    <div>
                        <div>Shipping</div>

                        <div className='edit-border'>

                            <div>
                            <label>Product Weight (kg)</label>
                            <input type='number' placeholder={productWeight}
                            onChange={(e) => {
                                setProductWeight(e.target.value);
                            }}/>
                            </div>

                            <div className='package-title'>Package Size</div>

                            <div className='package-size'>

                                <div>
                                <label>Length (in)</label>
                                <input className='input-flex' type='number' placeholder={productLength}
                                onChange={(e) => {
                                    setProductLength(e.target.value);
                                }}/>
                                </div>


                                <div>
                                <label>Breadth (in)</label>
                                <input className='input-flex'  type='number' placeholder={productBreadth}
                                onChange={(e) => {
                                    setProductBreadth(e.target.value);
                                }}/>
                                </div>


                                <div>
                                <label>Depth (in)</label>
                                <input className='input-flex'  type='number' placeholder={productDepth}
                                onChange={(e) => {
                                    setProductDepth(e.target.value);
                                }}/>
                                </div>

                            </div>

                        </div>
                    </div>



                    <div>
                        <div>Pricing</div>

                        <div className='edit-border'>

                                <div>
                                <label>Price (₹)</label>
                                <input type='number' placeholder={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}/>
                                </div>

                        </div>
                    </div>

                    


                    <button onClick={() => {
                        editHandler();
                    }}>Update</button>


                </div>


                </div>

            </div>

        </div>
    )
}