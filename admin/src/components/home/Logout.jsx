import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
const navigate=useNavigate()
 

    const logoutAction=()=>{
      localStorage.removeItem('token')
      navigate('/')
    }

  const handleClose = () => {
    props.done(false)
  };

  return (
    <React.Fragment>
    
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        
        <DialogContent style={{margin:0,padding:0}}>
        <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' ,backgroundColor:'#B2BEB5', width: '100%' ,position:'relative'}}>
        <Toaster/>
        <p>Are you sure you want to logout?</p>
        <button className="btn btn-danger w-25" onClick={logoutAction}>OK</button><br/>
        <button className="btn btn-warning mt-3 w-25"  onClick={handleClose}>Cancel</button></div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
