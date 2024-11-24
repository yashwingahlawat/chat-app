import { Stack } from "@mui/material";
import React, { memo } from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w}>
      {chats?.map((data, i) => {
        const { avatar, _id, members, groupChat, name } = data;
        const newMessageAlert = newMessagesAlert.find(
          (msg) => msg.chatId === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <ChatItem
            handleDeleteChat={handleDeleteChat}
            newMessageAlert={newMessageAlert}
            avatar={avatar}
            isOnline={isOnline}
            _id={_id}
            key={i}
            name={name}
            groupChat={groupChat}
            sameSender={chatId === _id}
            index={i}
          >
            {data}
          </ChatItem>
        );
      })}
    </Stack>
  );
};

export default memo(ChatList);
