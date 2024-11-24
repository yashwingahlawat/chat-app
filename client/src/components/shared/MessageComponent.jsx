import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { fileFormat, tranformImage } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const date = new Date(createdAt);
  const hours = date?.getHours();
  const minutes = date?.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const sameSender = sender?._id === user._id;
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      className={` w-fit p-2 px-4 rounded-3xl ${
        sameSender
          ? " text-white blueGradient self-end"
          : " senderMsgGradient text-white self-start"
      } `}
    >
      {!sameSender && (
        <Typography variant="caption" className=" text-yellow-300">
          {" "}
          {sender?.name}{" "}
        </Typography>
      )}

      {content && <Typography> {content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, i) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box my={"5px"} borderRadius={".5rem"} key={i}>
              <a
                href={tranformImage(url, 200)}
                target="_blank"
                download
                className=" text-white  underline-offset-0"
              >
                <RenderAttachment file={file} url={url} />
              </a>
            </Box>
          );
        })}

      <Typography
        className=" text-gray-200"
        sx={{ font: "small-caption" }}
        textAlign={"right"}
      >
        {" "}
        {formattedHours}:{formattedMinutes}{" "}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
