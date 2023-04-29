import '../CSS/Sidebar.css'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';



export const Sidebar = () => {

    const navigate = useNavigate();


    return (
        <div className="sidebar">

            <div><StoreIcon className='logo-icon icon'
            onClick = {() => {
                navigate('/');
            }}/></div>


            <div><AddBoxOutlinedIcon className='icon'
            onClick = {() => {
                navigate('/create');
            }}/></div>

        </div>
    )
}