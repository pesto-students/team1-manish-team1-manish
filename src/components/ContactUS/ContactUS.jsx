import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled("div")({
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
});

const ContactUsPage = () => {
  const handleCopyEmail = () => {
    const email = "Pestocb@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      alert("Email copied to clipboard: " + email);
    });
  };

  return (
    <Root>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="body1" align="center">
                For inquiries or assistance, please feel free to contact us at:
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ margin: "16px 0" }}
              >
                Pestocb@gmail.com
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCopyEmail}
              >
                Copy Email
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default ContactUsPage;
