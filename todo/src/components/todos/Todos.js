import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo, deleteTodo } from '../../actions/todo';
import TodoItem from './TodoItem';

import Button from '@mui/material/Button';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "@material-ui/core/Checkbox";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import formatDate from '../../utils/formatDate';
import { v4 as uuidv4 } from 'uuid';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Todos = ({ addTodo, deleteTodo, todo: { todos } }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: ''
  });
  const { id, title } = formData;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const new_id = uuidv4();
      const todo = {
        "id": new_id,
        "title": title,
        "date": formatDate(startDate)
      }
    handleClose();
    addTodo(todo);
    setFormData({ ...formData, "title": '', "id": ''});
    setStartDate(new Date());
  };


  return (
    <div >
      <div style={{padding: "100px"}}>
        <div>
          <Button sx={{mb: "20px", mt: "40px"}} variant="contained" onClick={handleClickOpen}>Add ToDo</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle><h3>New ToDo</h3></DialogTitle>
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
              <Button onClick={onSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Complete By</StyledTableCell>
                <StyledTableCell align="right">Update</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
                <StyledTableCell align="right">Completed</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <StyledTableRow key={todo.title}>
                  <StyledTableCell component="th" scope="row">
                    {todo.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">{todo.date}</StyledTableCell>
                  <StyledTableCell align="right">
                      <TodoItem {...todo} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <DeleteIcon onClick={() => deleteTodo(todo.id)} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Checkbox
                      name={title}
                      color="primary"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Todos.propTypes = {
  addTodo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  todo: state.todo
});

export default connect(mapStateToProps, { addTodo, deleteTodo })(Todos);
