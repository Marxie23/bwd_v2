import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Select,
  MenuItem
} from "@mui/material";
import postingService from "../../../services/posting.service";
import { useSelector } from "react-redux";

const PostActivityPage = ({ setIsUploading, post, handleClose }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // State Management
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [category, setCategory] = useState(post?.category || "activities");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post?.imageUrl ? `http://127.0.0.1:5000${post.imageUrl}` : null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || (!post && !image)) {
      setSeverity("error");
      setMessage("Please fill in all fields and select an image.");
      setOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("postPicture", image);

    try {
      let response;
      if (post) {
        response = await postingService.updatePosting(post.id, formData, currentUser.id);
      } else {
        response = await postingService.addPosting(formData, currentUser.id);
      }

      if (response.status === true) {
        setSeverity("success");
        setMessage(response.message || (post ? "Activity updated successfully!" : "Activity posted successfully!"));
        setIsUploading(true);
        handleClose?.();
      } else {
        setSeverity("error");
        setMessage(response.message || "Failed to post activity.");
      }
      setOpen(true);
    } catch (error) {
      setSeverity("error");
      setMessage(error.response?.data?.message || "Failed to post activity.");
      setOpen(true);
    }
  };

  // Handle Snackbar Close
  const handleSnackbarClose = () => setOpen(false);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "90vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {post ? "Edit Activity or Announcement" : "Post New Activity or Announcement"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                margin="normal"
                displayEmpty
              >
                <MenuItem value="activities">Activities</MenuItem>
                <MenuItem value="announcements">Announcements</MenuItem>
              </Select>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ marginBottom: "16px" }}
              />
              {preview && (
                <div style={{ marginBottom: "16px" }}>
                  <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              )}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {post ? "Update Post" : "Post Activity or Announcement"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PostActivityPage;
