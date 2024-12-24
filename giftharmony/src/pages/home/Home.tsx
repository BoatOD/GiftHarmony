import { Box, Typography, Paper, Grid2, Button } from "@mui/material";
import present from "../../assets/present.svg";
import { useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/Usercontext";
import CreateRoom from "../../component/CreateRoom";

const Home = () => {
  const { profile, onSuccess, onFailure, clientId } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
    <Box sx={{ flexGrow: 1, p: { xs: 5, md: 15 }, pt: { xs: 10, md: 25 } }}>
      <Grid2 container spacing={2}>
        {/* Left Section */}
        <Grid2 size={7}>
          <Typography
            variant="h1"
            fontWeight={400}
            color="#8D0000"
            className="signInFont"
          >
            {profile ? "Welcome," : "Sign in"}
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            color="#1C5736"
            className="webFont"
          >
            Gift Harmony
          </Typography>
          <Typography variant="h4" sx={{ color: "#6F6F6F", mt: 2 }}>
            A platform designed to leave lasting impressions and foster
            meaningful relationships on special occasions. It embodies the
            essence of harmony and conveys profound sentiments through the art
            of gifting.
          </Typography>
          {profile ? (
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                mt: 5,
                width: "40%",
                justifyContent: "left",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("santaroom")}
                sx={{
                  bgcolor: "#BE5050",
                  color: "font.main",
                  fontWeight: "bold",
                  mb: 2,
                  px: 3,
                }}
              >
                Santa’s Room
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  bgcolor: "#5E7764",
                  color: "font.main",
                  fontWeight: "bold",
                  px: 3,
                }}
              >
                Create Room
              </Button>
            </Box>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
              isSignedIn={true}
              render={(renderProps) => (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GoogleIcon />}
                  sx={{
                    mt: 5,
                    bgcolor: "#FDFDFD",
                    color: "#9D7373",
                    fontWeight: 600,
                    px: 3,
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign in with Google
                </Button>
              )}
            />
          )}
        </Grid2>

        {/* Right Section */}
        <Grid2 size={5}>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 300,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              bgcolor: "#FFE3E6",
              boxShadow: "none",
            }}
          >
            <img
              src={present}
              alt="present"
              style={{
                maxWidth: "180%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
    <CreateRoom open={open} onClose={() => setOpen(false)}/>
    </>
  );
};

export default Home;
