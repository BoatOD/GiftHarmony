import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import santa from "../assets/santa.svg";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../providers/UserProvider";

const base_url = import.meta.env.VITE_API_URL;

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, onSuccess, onFailure, clientId, logOut } =
    useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const pages = [
    { pageName: "Home", path: "" },
    ...(profile ? [{ pageName: "Santa's Room", path: "santaroom" }] : []),
    ...(profile ? [{ pageName: "Host Room", path: "hostroom" }] : []),
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (renderProps: { onClick: () => void, disabled?: boolean }) => {
    localStorage.removeItem("token");
    try {
      // Send logout request with credentials (cookies)
      await axios.get(base_url + "/logout", { withCredentials: true });
  
      // Trigger the onClick action
      renderProps.onClick();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: "general.light" }}>
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.path}
                  onClick={() => navigate(`/${page.path}`)}
                >
                  <Typography
                    textAlign="center"
                    className="navBarFont"
                    sx={{
                      my: 2,
                      color: "general.contrastText",
                      fontSize: "0.9rem",
                      display: "block",
                    }}
                  >
                    {page.pageName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.path}
                onClick={() => navigate(`/${page.path}`)}
                sx={{
                  textDecoration:
                    location.pathname === `/${page.path}`
                      ? "underline"
                      : "none",
                  textDecorationColor:
                    location.pathname === `/${page.path}`
                      ? "#8D0000"
                      : "transparent",
                }}
              >
                <Typography
                  textAlign="center"
                  className="navBarFont"
                  sx={{
                    color: "general.contrastText",
                    fontSize: "1.2rem",
                    display: "block",
                  }}
                >
                  {page.pageName}
                </Typography>
              </MenuItem>
            ))}
          </Box>

          {/* User Settings */}
          {profile ? (
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                mr: 2,
              }}
            >
              <Typography
                className="navBarFont"
                sx={{
                  color: "general.contrastText",
                  marginRight: "0.5rem",
                  fontSize: 18,
                }}
              >
                {profile.givenName}
              </Typography>
              {profile.imageUrl === "" ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile" src={santa} />
                </IconButton>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile" src={profile.imageUrl} />
                </IconButton>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* <Button
                    sx={{
                      bgcolor: "#FDFDFD",
                      color: "#9D7373",
                      fontWeight: 600,
                      px: 3,
                      mb: 1,
                    }}
                  >
                    Profile
                  </Button> */}
                  <GoogleLogout
                    clientId={clientId}
                    onLogoutSuccess={() => {
                      logOut();
                      handleCloseUserMenu();
                    }}
                    render={(renderProps) => (
                      <Button
                        sx={{
                          bgcolor: "#FDFDFD",
                          color: "#9D7373",
                          fontWeight: 600,
                          px: 3,
                        }}
                        onClick={() => handleLogout(renderProps)}
                        disabled={renderProps.disabled}
                      >
                        Log out
                      </Button>
                    )}
                  />
                </Box>
              </Menu>
            </Box>
          ) : (
            <GoogleLogin
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
              isSignedIn={true}
              render={(renderProps) => (
                <Button
                  color="primary"
                  startIcon={<GoogleIcon />}
                  sx={{
                    bgcolor: "general.light",
                    color: "#9D7373",
                    fontWeight: 600,
                    px: 3,
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Log in
                </Button>
              )}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
