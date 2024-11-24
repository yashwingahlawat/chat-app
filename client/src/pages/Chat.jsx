import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "../Socket";
import doodle3 from "../assets/doodle3.jpg";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events.mjs";
import { TypingLoader } from "../components/layout/Loaders";
import { useChatDetailsQuery, useGetOldMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { useNavigate } from "react-router-dom";
function Chat({ chatId, user }) {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetOldMessagesQuery({ chatId, page });
  const members = chatDetails?.data?.chat?.members;
  const dispatch = useDispatch();
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.message
  );
  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }];

  const navigate = useNavigate();
  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );
  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const eventHandler = {
    [ALERT]: alertListener,

    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        spacing={"1rem"}
        padding={"1rem"}
        height={"90%"}
        borderRadius={"10px"}
        sx={{
          backgroundImage: `url(${doodle3})`,
          mb: "10px",
          overflowX: "hidden",
          overflowY: "auto",
          marginTop: {
            xs: "-10px",
            sm: 0,
          },

          "&::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "100%",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ea7070",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        {!oldMessagesChunk?.isLoading &&
          allMessages.map((m, i) => (
            <MessageComponent key={i} message={m} user={user} />
          ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form className="h-[10%]" onSubmit={submitHandler}>
        <Stack
          height={"100%"}
          alignItems={"center"}
          position={"relative"}
          direction={"row"}
        >
          <IconButton
            sx={{
              rotate: "-30deg",
              position: "absolute",
              left: "0.7rem",
              mb: "5px",
              mr: "5px",
            }}
            onClick={handleFileOpen}
          >
            <AttachmentOutlinedIcon className=" text-gray-700" />
          </IconButton>

          <InputBox
            className=" p-0 ml-2 sm:mx-0"
            placeholder="Type your message"
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              ml: ".7rem",
              mb: "13px",
              padding: "0.5rem",
              ":hover": {
                opacity: 0.7,
              },
            }}
          >
            <SendIcon className="text-[#ea7070]" />
          </IconButton>
        </Stack>
      </form>
      <FileMenu chatId={chatId} anchorEl={fileMenuAnchor} />
    </>
  );
}

export default AppLayout()(Chat);
