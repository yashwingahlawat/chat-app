import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert = [],
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      className="p-0"
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: "-100%",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: index * 0.13,
        }}
        className={`flex shadow-lg   justify-start pb-2 items-center gap-[1.6rem] px-0 py-2 relative ${sameSender ? "blueGradient" : "black"
          }
        ${sameSender ? "text-white" : "text-black"}
        } border-b border-[#f0f0f0]`}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography className={` sm:text-white`}>{name}</Typography>
          {newMessageAlert.count && (
            <Typography className="text-white" variant="body2">
              <span className=" text-[#FFFF00] text-md font-semibold">
                {newMessageAlert.count}
              </span>{" "}
              new messages
            </Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#56ff4a",
              position: "absolute",
              top: "50%",
              right: "1rem",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
