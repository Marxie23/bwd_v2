import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const images = [
  { src: "/assets/images/bwdFeatured1.jpg", title: "Newly rehab PS#1 with the new vertical-in-line booster pump and collector tank." },
  { src: "/assets/images/bwdFeatured2.jpg", title: "Newly rehab PS#1 with the new vertical-in-line booster pump and collector tank." },
  { src: "/assets/images/bwdFeatured3.jpg", title: "Water Treatment Plant." },
  { src: "/assets/images/bwdFeatured4.jpg", title: "New Booster Pump." },
];


const AnnouncementCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
                      boxShadow: "0 10px 30px rgba(39, 141, 58, 0.7)",
                    },
          }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight={700}>
            FEATURED & ANNOUNCEMENT
          </Typography>
          <Typography variant="body1" color="white">
            Stay updated with the latest news, system maintenance, and service improvements.
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
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                border: "4px solid #15AC45",
              }}
              />
              <Typography variant="body2" color="white" style={{ marginTop: "8px"}}>
                {images[currentImageIndex].title}
              </Typography>
        </div>
      </Card>
    </Grid>
  );
};

export default AnnouncementCard;
