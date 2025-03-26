import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";


const AnnouncementCard = ({announcements = []}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if(announcements.length > 0){
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % announcements.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [announcements]);

  if (announcements.length === 0) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        No Announcements Available
      </Typography>
    );
  }

  const currentAnnouncement = announcements[currentImageIndex];

  return (
    <Grid item xs={12} sm={6} md={6} lg={3}>
      <Card
        sx={{
           minHeight: 400,
           textAlign: "center",
           background: "rgba(39, 141, 58, 0.15)",
           backdropFilter: "blur(10px)",
           color: "white",
           boxShadow: 6,
           borderRadius: 3,
           p: 2,
           transition: "transform 0.3s ease, box-shadow 0.3s ease",
           "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 10px 30px rgba(44, 35, 118, 1)",
                    },
          }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight={700}>
            FEATURED & ANNOUNCEMENT
          </Typography>
          <Typography variant="body1" color="white">
            {currentAnnouncement.description}
          </Typography>
        </CardContent>
        <div
          style={{
            width: "100%",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            }}
            >
              <img
              src={`http://127.0.0.1:5000${currentAnnouncement.imageUrl}`}
              alt={currentAnnouncement.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                border: "4px solid #6858CA",
              }}
              />
              <Typography variant="body2" color="white" style={{ marginTop: "8px"}}>
              {currentAnnouncement.title}
              </Typography>
        </div>
      </Card>
    </Grid>
  );
};

export default AnnouncementCard;
