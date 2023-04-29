import { useState } from 'react';
// import '../CSS/Create.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../Lib';
import { Sidebar } from '../Components/Sidebar';



export const Create = () => {


    const navigate = useNavigate();


    //Required input fields to create a new product

    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productWeight, setProductWeight] = useState("");
    const [productLength, setProductLength] = useState("");
    const [productBreadth, setProductBreadth] = useState("");
    const [productDepth, setProductDepth] = useState("");
    const [price, setPrice] = useState("");



    //Form validation, all fields are required

    const formValidation = () => {

        if(productName == "" || productDesc == "" || category == "" || quantity == "" || productWeight == "" || 
        productLength == "" || productBreadth == "" || productDepth == "" || price == "") 
        {
            alert("All fields must be filled");
            return ;
        }
    }



    //Send create request to server through axios

    const createHandler = async () => {


        formValidation();

        

        try {

            const {data} = await axios.post(
                `${baseUrl}/api/inventory/`,
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

            console.log("Product created : ", data);

            //Upon creating new product redirect to home page
            navigate('/');

        }

        catch(err) {
            console.log(err);
        }

    }

    
    return (
        <div className="edit">

            <div className='edit-sidebar'>
                <Sidebar/>
            </div>


            <div>

                <div className='edit-title'>

                    <div>Add New Product</div>

                </div>
             

                <div className="edit-main">


                <div className='edit-main-left'>

                    <div>
                        <div>Description</div>

                        <div className='edit-border'>
                            <div>
                            <label>Product Name</label>
                            <input type='text' placeholder={productName} required
                            onChange={(e) => {
                                setProductName(e.target.value);
                            }}/>
                            </div>

                            <div>
                            <label>Product Description</label>
                            <input type='text' placeholder={productDesc} required
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
                            <input type='text' placeholder={category} required
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
                            <input type='number' placeholder={quantity} required
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
                            <input type='number' placeholder={productWeight} required
                            onChange={(e) => {
                                setProductWeight(e.target.value);
                            }}/>
                            </div>

                            <div className='package-title'>Package Size</div>

                            <div className='package-size'>

                                <div>
                                <label>Length (in)</label>
                                <input className='input-flex' type='number' placeholder={productLength} required
                                onChange={(e) => {
                                    setProductLength(e.target.value);
                                }}/>
                                </div>


                                <div>
                                <label>Breadth (in)</label>
                                <input className='input-flex'  type='number' placeholder={productBreadth} required
                                onChange={(e) => {
                                    setProductBreadth(e.target.value);
                                }}/>
                                </div>


                                <div>
                                <label>Depth (in)</label>
                                <input className='input-flex'  type='number' placeholder={productDepth} required
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
                                <input type='number' placeholder={price} required
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}/>
                                </div>

                 

                        </div>
                    </div>

                    


                    <button onClick={() => {
                        createHandler();
                    }}>Create</button>


                </div>


                </div>

            </div>

        </div>
    )

}