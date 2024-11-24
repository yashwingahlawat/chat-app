import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Suspense } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoNobg.png";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsNotifications,
  setIsSearch,
} from "../../redux/reducers/misc";
import { server } from "../../constants/config";

const Search = React.lazy(() => import("../specific/Search"));
const NewGroup = React.lazy(() => import("../specific/NewGroup"));
const Notifications = React.lazy(() => import("../specific/Notifications"));

const Header = () => {
  const navigate = useNavigate();

  const { isSearch } = useSelector((store) => store.misc);
  const { isNewGroup } = useSelector((store) => store.misc);
  const { notificationsCount } = useSelector((store) => store.chat);
  const { isNotifications } = useSelector((store) => store.misc);

  const dispatch = useDispatch();

  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const createNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const navigateToGroup = () => navigate("/groups");

  const openNotification = () => {
    dispatch(setIsNotifications(true));
  };

  const logoutHandler = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message, { id: toastId });
      dispatch(userNotExists());
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, height: "4rem" }}>
        <AppBar
          position="sticky"
          sx={{ background: "linear-gradient(to right, #ea7070, #352f75)" }}
        >
          <Toolbar>
            <div className="flex gap-3 items-center">
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton onClick={handleMobile}>
                  <MenuIcon className="text-white" />
                </IconButton>
              </Box>
              <IconButton
                onClick={() => navigate("/")}
                sx={{
                  padding: 0,
                }}
              >
                <Avatar
                  src={logo}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Chatify
              </Typography>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon className="text-white" />}
                onclick={openSearch}
              />

              <IconBtn
                title={"Create New Group"}
                icon={<AddIcon className="text-white" />}
                onclick={createNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon className="text-white" />}
                onclick={navigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                value={notificationsCount}
                icon={<NotificationsIcon className="text-white" />}
                onclick={openNotification}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon className="text-white" />}
                onclick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search isSearch={isSearch} />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup isNewGroup={isNewGroup} />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <Notifications isNotifications={isNotifications} />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onclick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton size="large" onClick={onclick}>
        {value ? (
          <Badge color="error" badgeContent={value}>
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
