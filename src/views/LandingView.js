import React from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import ActivitiesCard from "../component/ActivitiesCard";
import AnnouncementCard from "../component/AnnouncementCard";

export default function LandingView() {
  return (
    <Box>
      <Grid container spacing={2} sx={{justifyContent: "center",alignContent:'center', minHeight:'90vh', p:2}}>
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
              <Typography gutterBottom variant="h5" fontWeight={700}>
                HISTORY
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
              The Bongao Water District (BWD) was established on August 05, 1986 as a Quasi-Public Corporation by virtue of Provincial Board Resolution No. 87-10 initiated by then OIC Gov. 
              Lorenzo Reyes which also authorized the Governor to transfer all existing properties, equipments, and facilities of the previous provincial water system (NAWASA) to the newly formed Water District.

              It was initially led by General Manager Engr. Rosendo R. Reyes and a five-member Board of Directors representing various sectors.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
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
              <Typography gutterBottom variant="h5" fontWeight={700}>
                VISION
              </Typography>
              <Typography mb={2} variant="body1" sx={{ opacity: 0.9 }}>
                An excellent water service provider instrumental to the economic growth in Tawi-Tawi.
              </Typography>
              <Typography gutterBottom variant="h5" fontWeight={700}>
                MISSION
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Deliver safe, sufficient, affordable water while maintaining a competent workforce,
                satisfied consumers and take active role in environmental concerns.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <ActivitiesCard />
        <AnnouncementCard/>
      </Grid>
    </Box>
  );
}
