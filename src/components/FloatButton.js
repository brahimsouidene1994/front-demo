

import { useNavigate } from "react-router";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
export default function FloatButton() {
    let navigate = useNavigate();
    return (
        <Fab onClick={()=>navigate('/newbook/'+-1)}color="primary" aria-label="add" sx={{position:'fixed', bottom:16, left:16}}>
            <AddIcon />
        </Fab>
    )
}