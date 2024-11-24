import { Drawer, Grid, Paper, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { useGetNotificationsQuery, useMyChatsQuery } from "../../redux/api/api";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import { getSocket } from "../../Socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events.mjs";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import { Balance } from "@mui/icons-material";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = getSocket();

    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobileMenu(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback(
      (data) => {
        setOnlineUsers(data);
      },
      [data]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
      [NEW_REQUEST]: newRequestListener,
    };

    useSocketEvents(socket, eventHandlers);
    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer
            open={isMobileMenu}
            onClose={handleMobileClose}
            className=" text-black"
          >
            <ChatList
              w="60vw"
              handleDeleteChat={handleDeleteChat}
              chatId={chatId}
              newMessagesAlert={newMessagesAlert}
              chats={data?.message}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container sx={{ height: "calc(100vh - 4rem)" }}>
          <Grid
            component={Paper}
            elevation={3}
            item
            sm={4}
            md={3}
            sx={{
              mt: 1,
              overflow: "auto",
              height: "97%",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ea7070",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0",
              },
              display: { xs: "none", sm: "block" },
              padding: 1,
              bgcolor: "transparent",
              border: "2px solid #ea7070",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                handleDeleteChat={handleDeleteChat}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                chats={data?.message}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            sx={{
              mt: 0,

              height: "98.5%",
              pt: 0,
              p: { xs: 0, sm: 1 },
            }}
          >
            <WrappedComponent chatId={chatId} user={user} {...props} />
          </Grid>
          <Grid
            component={Paper}
            elevation={3}
            item
            sx={{
              overflow: "auto",
              height: "97%",
              mt: 1,
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ea7070",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0",
              },

              display: { xs: "none", md: "block" },
              padding: 2,
              bgcolor: "transparent",
              border: "2px solid #ea7070",
            }}
            md={4}
            lg={3}
          >
            {isLoading ? <Skeleton /> : <Profile user={user} />}
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
