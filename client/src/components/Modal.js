import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { makeStyles } from '@mui/styles';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: "center"
};

const useStyles = makeStyles({
    menu_link: {
      color: "black",
      textDecoration: "none"
    },
    link: {
      color: 'white',
      textDecoration: "none"
    },
    button: {
      margin: '10px'
    }
  });

export default function BasicModal() {
const classes = useStyles()

const dispatch = useDispatch()

  const open = useSelector(state => state.ui.modal.showModal)
  const message = useSelector(state => state.profile_data.serverMsg)
  const modal = useSelector( state => state.ui.modal )

  const handleCloseModal = ()=>{
        dispatch(uiActions.setModal({
            show: false
        }))

  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          
          <Button className={classes.button} onClick={handleCloseModal} variant='contained' sx={{ display: modal.firstButton.displayFirstButton }}><Link className={classes.link} to='/profile'>{modal.firstButton.textFirstButton}</Link></Button>
          <Button className={classes.button} onClick={handleCloseModal} variant='contained' sx={{ display: modal.secondButton.displaySecondButton }}>{modal.secondButton.textSecondButton}</Button>
        </Box>
      </Modal>
    </div>
  );
}
