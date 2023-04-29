import '../CSS/Inventory.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { baseUrl } from '../Lib'
import { Sidebar } from '../Components/Sidebar';
import { io } from 'socket.io-client'



export const Inventory = () => {


    const navigate = useNavigate();


    //Fetch all products in the inventory
    const [products, setProducts] = useState([]);



    //Send delete request to server through axios

    const deleteHandler = async (id) => {

        try {

            await axios.delete(
                `${baseUrl}/api/inventory/${id}`
            )

            console.log(`Product ${id} deleted`);


        }

        catch(err) {
            console.log(err);
        }

    }








    //Retrieve all inventory products

    const getInventoryData = async () => {

        try {

          
            const {data} = await axios.get(
                `${baseUrl}/api/inventory/`
            )

            //Set products to inventory data

            setProducts(data);
            console.log("All products in the inventory", data);
        }

        catch(err) {
            console.log(err);
        }

    }




    useEffect(() => {

        getInventoryData();

    }, []);



    /*Connect socket.io
    Specify events from the socket
    Update all clients when a change is made*/

    useEffect(() => {

        //Connect socket.io

        const socket = io(`${baseUrl}`);
    

        socket.on('connnection', () => {
          console.log('connected to server');
        })

        //Update all clients when a product is created
        socket.on('product-added', (products) => {
            setProducts(products)
        })

        //Update all clients when a product is updated
        socket.on('product-updated', (products) => {
            setProducts(products)
        })


        //Update all clients when a product is deleted
        socket.on('product-deleted', (products) => {
            setProducts(products)
        })

    
        // socket.on('message', (message) => {
        //   console.log(message);
        // })
    
        socket.on('disconnect', () => {
          console.log('Socket disconnecting');
        })
    
      }, [])





    return (
        <div className='inventory'>

        <div className='inventory-sidebar'>
            <Sidebar/>
        </div>

        <div>

            <div className='inventory-header'>Inventory</div>

            <div className='inventory-table'>

            <table>

                <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>

      
                <tbody>
                {
                    products?.map((product) => (

                        <tr key = {product._id}>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>₹{product.price}</td>
                            <td className='action-field'>
                                <div 
                                onClick={() => {
                                    deleteHandler(product._id);
                                }}
                                ><DeleteOutlineIcon/>
                                </div>


                                <div onClick={() => {
                                    navigate(`/edit/${product._id}`);
                                }}><InsertDriveFileOutlinedIcon/>
                                </div>

                            </td>
                        </tr>

                    ))
                    
                }

                </tbody>

                

                

              
            </table>

            </div>

        </div>


        </div>
    )

}