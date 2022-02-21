import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdateIcon from '@material-ui/icons/Update';
import { updateTodo } from '../../actions/todo';
import { setAlert } from '../../actions/alert';
import { useDispatch } from "react-redux";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import formatDate from '../../utils/formatDate';

import Button from '@mui/material/Button';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  UPDATE_TODO,
  ADD_TODO,
  DELETE_TODO
} from "../../actions/types";





const TodoItem = ({
  id
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: ''
  });
  const { title } = formData;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const todo = {
      "id": id,
      "title": title,
      "date": formatDate(startDate)
    }
    handleClose();

    dispatch({
      type: DELETE_TODO,
      payload: id
    });
    
    dispatch({
      type: ADD_TODO,
      payload: todo
    });
    dispatch(setAlert('ToDo Updated', 'success'));
  
    setFormData({ ...formData, "title": '', "id": ''});
    setStartDate(new Date());
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3>Update ToDo</h3></DialogTitle>
        <DialogContent>
          <div className="layout">
            <span>Title</span>
            <input className="input-group bottom"
              required
              id="outlined-required"
              label="Title"
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>
          <div>
            <span>Complete By</span>
            <DatePicker className="input-group" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      <div>
        <UpdateIcon onClick={handleClickOpen}/>
      </div>
    </div>
  );
};


TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  todo: state.todo
});

export default connect(mapStateToProps, {  updateTodo })(TodoItem);
