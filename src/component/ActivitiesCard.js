import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const images = [
  { src: "/assets/images/bwdActivities1.jpg", title: "Coastal cleanup/cleanliness drive." },
  { src: "/assets/images/bwdActivities2.jpg", title: "Coastal cleanup/cleanliness drive." },
  { src: "/assets/images/bwdActivities3.jpg", title: "Budget Presentation and Deliberation." },
  { src: "/assets/images/bwdActivities4.jpg", title: "Budget Presentation and Deliberation." },
];

const ActivitiesCard = () => {
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
            ACTIVITIES
          </Typography>
          <Typography variant="body1" color="white">
            Explore our community initiatives and ongoing projects for better water services.
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

export default ActivitiesCard;
