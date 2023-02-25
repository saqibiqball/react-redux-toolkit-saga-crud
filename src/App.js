import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersStart } from "./store/slices/userSlice";
import { createAction } from "@reduxjs/toolkit";
import DataTable from "./components/dataTable";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import uuid4 from "uuid4";
const getUserStart = createAction("user/getUserStart");
const deleteUser = createAction("user/deleteUser");
const addUser = createAction("user/addUser");
const updateUser = createAction("user/updateUser");
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 700,
  color: theme.palette.text.primary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.user?.users);
  console.log("usersss from appjs --", users);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setErrorOpen(false)
  };
  useEffect(() => {
    dispatch(getUsersStart());
  }, [users]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [successMsg,setSuccessMsg] = useState("");
  const handleUserEdit = (editValues) => {
    setIsEdit(true);
    setUserId(editValues.id);
    setUserName(editValues.userName);
    setUserEmail(editValues.email);
  };
  const handleEditCancelButton = () => {
    setUserName("");
    setUserEmail("");
    setIsEdit(false);
  };
  const handleAddButton = () => {
    const user = {
      id: uuid4(),
      userName,
      email: userEmail,
    };
    if (userName && userEmail !== "") {
      dispatch(addUser(user));
      setSuccessOpen(true);
      setSuccessMsg("New User Added")
    //   setTimeout(function(){
    //     window.location.reload(false);
    //  }, 500);
    } else {
      setErrorOpen(true);
    }
  };
  const handleEditButton = () => {
    const user = {
      id: userId,
      userName,
      email: userEmail,
    };
    if (userName && userEmail !== "") {
      dispatch(updateUser(user));
      setSuccessOpen(true);
      setSuccessMsg("User Credentials Updated")
    //   setTimeout(function(){
    //     window.location.reload(false);
    //  }, 500);
      
    } else {
      setErrorOpen(true);
    }
  };
  const handleUserDelete = (deleteValue) => {
    dispatch(deleteUser(deleteValue));
    setSuccessOpen(true);
    setSuccessMsg("User Deleted")
  //   setTimeout(function(){
  //     window.location.reload(false);
  //  }, 500);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <DataTable
            rows={users.length < 1 ? [] : users}
            handleEdit={(editValues) => handleUserEdit(editValues)}
            handleDelete={(deleteValue) => handleUserDelete(deleteValue)}
          />
        </StyledPaper>

        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              overflow: "hidden",
              px: 3,
              justifyContent: "space-around",
            }}
          >
            <TextField
              placeholder="username"
              type="text"
              // helperText={userName === "" && "Field is required"}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <TextField
              placeholder="email"
              type="text"
              // helperText={userEmail === "" && "Field is required"}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {isEdit ? (
              <>
                <Button variant="contained" onClick={handleEditButton}>
                  Edit User
                </Button>{" "}
                <Button variant="contained" onClick={handleEditCancelButton}>
                  cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleAddButton}>
                Add User
              </Button>
            )}
          </Box>
        </StyledPaper>
        
          <Snackbar
            open={successOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMsg}
            </Alert>
          </Snackbar>
       
          <Snackbar
            open={errorOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Please fill the fields
            </Alert>
          </Snackbar>
      
      </Box>
    </div>
  );
};

export default App;
