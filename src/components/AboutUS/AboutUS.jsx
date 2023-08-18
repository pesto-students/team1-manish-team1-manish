import React from "react";
import { Container, Typography, Grid, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled("div")({
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
});

const AvatarImage = styled(Avatar)({
  width: 120,
  height: 120,
  margin: "0 auto", // Center the avatar
});

const DividerLine = styled(Divider)({
  margin: "16px 0",
});

const AboutUsPage = () => {
  // Replace with your actual data
  const teamMembers = [
    {
      name: "Hritik Singh",
      role: "Co-Founder & CEO",
      avatarUrl:
        "https://media.licdn.com/dms/image/C4E03AQEnC4cRKjmFlA/profile-displayphoto-shrink_800_800/0/1634118049171?e=1697673600&v=beta&t=jFOLIIe_Ix2clc2DuiVImkV7kkhQEk50gm6RFtjiSGU",
      bio: "I am a dedicated graduate student at Inderprastha Engineering College, fueled by a relentless pursuit of knowledge. A dynamic Full Stack Web Developer, I wield expertise in cutting-edge technologies including React.js, Node.js, Express.js, as well as a mastery of HTML5 and CSS.",
    },
    {
      name: "Saurabh Kumar",
      role: "Co-Founder & CTO",
      avatarUrl:
        "https://media.licdn.com/dms/image/C5603AQEaaFL5aXobmg/profile-displayphoto-shrink_800_800/0/1637378655404?e=1697673600&v=beta&t=puVvbJxvfHefZzWhVxw3mY6YzAmquf1SaXuqBEM5YgE",
      bio: "As a Frontend Developer, I create captivating web experiences through expert use of HTML, CSS, and JavaScript. Proficient in React JS, I seamlessly translate designs into interactive interfaces, ensuring optimal performance and cross-device compatibility.",
    },
    // Add more team members as needed
  ];

  return (
    <Root>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <DividerLine />
        <Grid container justifyContent="center" spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AvatarImage alt={member.name} src={member.avatarUrl} />
              <Typography variant="h6" align="center">
                {member.name}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
              >
                {member.role}
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                {member.bio}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Root>
  );
};

export default AboutUsPage;
