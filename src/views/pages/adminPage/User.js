import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, TextField, Grid, Dialog, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CustomerCardAdd from "../../../component/Input/CustomerCardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../actions/users";
import UsersInfoCard from "../../../component/UsersInfoCard";
import UserCardAdd from "../../../component/Input/UserCardAdd";

const User = () => {

      const navigate = useNavigate();
      const dispatch = useDispatch();
      const theme = useTheme();
      const isXs = useMediaQuery(theme.breakpoints.down('xs'));
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      const { user: currentUser } = useSelector((state) => state.auth);
      const [transformedUsers, setTransformedUsers] = useState([])
      const [searchQuery, setSearchQuery] = useState("");
      const [filteredUsers, setFilteredUsers] = useState([]);
      const [selectedUser, setSelectedUser] = useState(null);
      const [openAddNew, setOpenAddNew] = useState(false);
      const [open, setOpen] = useState(false);
      const [update, setUpdate] = useState(false);

      useEffect(() => {
        const currentUserID = currentUser.id
        const fetchUsers = async () => {
          try {
            const result = await dispatch(getUsers(currentUserID,currentUserID));
            const users = result.users
            const mappedUsers = users.map(users => {
              return {
                id: users.id,
                username: users.username,
                fullName: users.fullName,
                email: users.email,
                userType: users.userType,
                profilePicture: users.profilePicture,
                status: users.status === true ? "Active": "Inactive"
              }
            })
            setFilteredUsers(mappedUsers)
            setTransformedUsers(mappedUsers)
          } catch (error) {
            console.log(error);
          }
        };
        fetchUsers();
      }, [update]);

      const columns = [
        { field: "username", headerName: "Username", flex: 0.8 },
        { field: "fullName", headerName: "Name", flex: 1.5 },
        { field: "email", headerName: "Email", flex: 1.5 },
        { field: "userType", headerName: "User Type", flex: 0.8 },
        { field: "status", headerName: "Status", flex: 0.5 }
      ];

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleAddNewOpen = () => {
        setOpenAddNew(true);
      };
      const handleAddNewClose = () => {
        setOpenAddNew(false);
      };

      const handleCellClick = (params) => {
        // console.log("Cell clicked:", params);
        // alert(`Cell clicked: Row ID = ${params.id}, Field = ${params.field}`);
        const customer = transformedUsers.find((cust) => cust.id === params.id)
        if (customer){
          setSelectedUser(customer)
          console.log(customer)
        }
        handleClickOpen()
      };

      const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
          const filtered = transformedUsers.filter((customer) => {
            return (
              customer.fullName.toLowerCase().includes(query) ||
              customer.username.toLowerCase().includes(query.toLowerCase())
            );
          });
          setFilteredUsers(filtered);
        } else {
          setFilteredUsers(transformedUsers);
        }
      };
  
  return (
    <Box sx={{ padding: 1, mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'center'}}>
          <TextField
            label="Search Customer"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{display:'flex', justifyItems:'center'}}>
            <IconButton onClick={handleAddNewOpen} sx={{height:'50px', width:'50px',}}>
              <AddCircleOutlinedIcon sx={{fontSize:'30px', color:'#013195'}}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      {/* Table for Customer List */}
      <Grid container>
        <Grid item xs={12} lg={6} component={Paper}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            disableSelectionOnClick
            sx={{height:'80vh'}}
            onCellClick={handleCellClick}
          />
        </Grid>
        <Grid item lg={6} sx={{display:{lg:'unset', xs:'none'} }}>
          <Box component={Paper} sx={{mr:1, ml:1, p:2}}>
            <UsersInfoCard
              id={selectedUser ? selectedUser.id: 0}
              username={selectedUser ? selectedUser.username : ""}
              fullName={selectedUser ? selectedUser.fullName : ""}
              email={selectedUser ? selectedUser.email : ""}
              accessType={selectedUser ? selectedUser.userType : ""}
              status={selectedUser ? selectedUser.status : ""}
              profilePicture={selectedUser? selectedUser.picture : ""}
            />
          </Box>
        </Grid>
        {!isXs && (
            <React.Fragment>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              sx={{display:{lg:'none', xs:'unset'}}}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent>
                <Grid item xs={12} lg={6}>
                  <Box component={Paper} sx={{ mr: 1, ml: 1, p: 1, display:{lg:'none', xs:'unset'}}}>
                    <UsersInfoCard
                      id={selectedUser ? selectedUser.id: 0}
                      username={selectedUser ? selectedUser.username : ""}
                      fullName={selectedUser ? selectedUser.fullName : ""}
                      email={selectedUser ? selectedUser.email : ""}
                      accessType={selectedUser ? selectedUser.userType : ""}
                      status={selectedUser ? selectedUser.status : ""}
                      profilePicture={selectedUser? selectedUser.picture : ""}
                    />
                  </Box>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
          )}
          <React.Fragment>
            <Dialog
              fullScreen={fullScreen}
              open={openAddNew}
              onClose={handleAddNewClose}
            >
              <DialogContent>
                <Grid item xs={12} lg={12}>
                  <Box component={Paper} sx={{ mr: 1, ml: 1, p: 2}}>
                    <UserCardAdd setUpdate={setUpdate} setOpenAddNew={setOpenAddNew}/>
                  </Box>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleAddNewClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
      </Grid>
    </Box>
  );
};

export default User;
