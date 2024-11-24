import React from "react";
import { tranformImage } from "../../lib/features";
import TopicIcon from "@mui/icons-material/Topic";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          className=" rounded-xl w-[200px] h-[150px] object-contain "
          src={tranformImage(url, 200)}
          alt="attachment"
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <TopicIcon />;
  }
};

export default RenderAttachment;
