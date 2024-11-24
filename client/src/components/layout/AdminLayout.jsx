import {
  Grid,
  Paper,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
  Tooltip,
  styled,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { themeBlue } from "../../constants/sampleData";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CommentIcon from "@mui/icons-material/Comment";
import { Link as linkComponent } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/logoNobg.png";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";
const Link = styled(linkComponent)`
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  color: white;
  transition: background-color 0.15s ease-in-out 0.1s;

  &:hover {
    background-color: rgb(0, 0, 0, 0.25);
  }
`;

const adminRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <CommentIcon />,
  },
];
const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const hadnleClose = () => setIsMobile(false);
  const handleIsMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const logoutHandler = () => {
    dispatch(adminLogout());
  };
  return (
    <Grid
      justifyContent={"space-between"}
      gap={"1rem"}
      container
      padding={".5rem"}
      height={"100vh"}
    >
      <Grid
        padding={".5rem"}
        width={"30%"}
        height={"97vh"}
        component={Paper}
        elevation={4}
        item
        md={4}
        lg={3}
        bgcolor={"transparent"}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          color: "white",
          border: `2px solid ${themeBlue}`,
        }}
      >
        <Sidebar logoutHandler={logoutHandler} />
      </Grid>
      <Grid
        height={"97vh"}
        width={"100%"}
        padding={".5rem"}
        xs={12}
        md={7.7}
        item
        lg={8.8}
        sx={{
          overflow: "auto",
          color: "white",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ea7070",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        {children}
      </Grid>

      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        {!isMobile ? (
          <Tooltip title="Open sidebar">
            <IconButton onClick={handleIsMobile}>
              <MenuOutlinedIcon className=" text-gray-200" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Close sidebar">
            <IconButton onClick={handleIsMobile}>
              <CancelOutlinedIcon className=" text-gray-200" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Drawer
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
        open={isMobile}
        onClose={hadnleClose}
      >
        <Sidebar logoutHandler={logoutHandler} w={"contain"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;

const Sidebar = ({ w = "100%", logoutHandler }) => {
  return (
    <Stack
      spacing={"3rem"}
      sx={{
        color: "white",
        bgcolor: {
          xs: "#333333",
          md: "transparent",
        },
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ea7070",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0",
        },
        padding: {
          xs: "3rem",
          md: "1rem",
        },
      }}
      width={w}
      height={"100%"}
      overflow={"auto"}
    >
      <Typography
        display={"flex"}
        gap={"1rem"}
        textTransform={"uppercase"}
        variant="h4"
      >
        <Avatar src={logo} />
        Chatify
      </Typography>

      <Stack spacing={"1rem"}>
        {adminRoutes.map((route) => (
          <Link
            className={`${location.pathname === route.path && "blueGradient"}`}
            key={route.path}
            to={route.path}
          >
            <Stack alignItems={"center"} direction={"row"} spacing={"1rem"}>
              <Tooltip title={route.name}>{route.icon}</Tooltip>
              <Typography>{route.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack alignItems={"center"} direction={"row"} spacing={"1rem"}>
            <LogoutIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
