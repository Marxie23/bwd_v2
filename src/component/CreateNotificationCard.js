import React, { useEffect, useState } from "react";
import { 
  Card, CardContent, CardHeader, TextField, Button, FormControl, Chip, 
  CircularProgress
} from "@mui/material";
import { Autocomplete } from "@mui/material"; // Import Autocomplete
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/users";
import { createNotification } from "../actions/notifications";
import SendIcon from "@mui/icons-material/Send";

export default function CreateNotification() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await dispatch(getUsers(currentUser.id, currentUser.id));
        const mappedUsers = result.users.map(user => ({
          id: user.id,
          fullName: user.fullName,
          userType: user.userType,
          email: user.email
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch, currentUser]);

  // ✅ Using separate state variables
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [visibleTo, setVisibleTo] = useState("All");
  const [contentId, setContentId] = useState("")

  const [loading, setLoading] = useState(false)

  // ✅ Handle input changes properly
  const handleTypeChange = (e) => setType(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleVisibleToChange = (e) => setVisibleTo(e.target.value);
  const handleContentIdChange = (e) => setContentId(e.target.value)

  // ✅ Handle selection from the Autocomplete
  const handleRecipientChange = (event, newValue) => {
    setRecipients(newValue);
  };

  // ✅ Handle select all/deselect all users
  const handleSelectAll = () => {
    setRecipients(recipients.length === users.length ? [] : users);
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const result = await dispatch(createNotification(type,content,contentId,recipients,visibleTo,currentUser.id))
            const isTrue = result.status
            if(isTrue){
                setLoading(false)
                setType("")
                setContent("")
                setRecipients([])
                setVisibleTo("All")
                setContentId("")
                return;
            }
            else{
                setLoading(false)
                return;
            }
    }catch(error){
      console.log(error)
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Create Notification" sx={{ textAlign: "center", fontWeight: "700" }} />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: "1rem" }}>
          
          <TextField 
            label="Notification Type" 
            name="type" 
            value={type} 
            onChange={handleTypeChange} 
            fullWidth 
            required 
          />
                    <TextField 
            label="Notification Content ID" 
            name="contentId" 
            value={contentId} 
            onChange={handleContentIdChange}
            rows={3} 
            type='number'
            fullWidth 
            required 
          />

          <TextField 
            label="Notification Content" 
            name="content" 
            value={content} 
            onChange={handleContentChange} 
            multiline 
            rows={3} 
            fullWidth 
            required 
          />

          {/* Searchable Multi-Select User List */}
          <FormControl fullWidth>
            <Autocomplete
              multiple
              options={users}
              getOptionLabel={(option) => `${option.fullName}(${option.userType})`}
              value={recipients}
              onChange={handleRecipientChange}
              renderInput={(params) => <TextField {...params} label="Search & Select Users" />}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip key={option.id} label={option.fullName} {...getTagProps({ index })} />
                ))
              }
            />
            <Button onClick={handleSelectAll} variant="outlined" sx={{ mt: 1 }}>
              {recipients.length === users.length ? "Deselect All" : "Select All"}
            </Button>
          </FormControl>

          {/* Spacer to push button to bottom */}
          <div style={{ flexGrow: 1 }}></div>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: "auto" }}
                                  startIcon={
                                    loading ? (
                                        <CircularProgress size={20} color="inherit" />
                                      ) : (
                                        <SendIcon />
                                      )
                                }>
            {loading ?"Sending notification..." :"Send Notification"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
