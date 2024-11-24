import {
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  fabClasses,
} from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((store) => store.misc);
  const closeMenuHandler = () => dispatch(setIsFileMenu(false));

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectImage = () => imageRef.current.click();
  const selectAudio = () => audioRef.current.click();
  const selectVideo = () => videoRef.current.click();
  const selectFile = () => fileRef.current.click();

  const [sendAttachments] = useSendAttachmentsMutation();
  const fileChageHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 5)
      return toast.error(`You can only send upto 5 ${key}s at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Uploading ${key}(s)...`);
    closeMenuHandler();

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => {
        myForm.append("files", file);
      });
      const res = await sendAttachments(myForm);
      if (res.data) {
        toast.success(`${key}(s) sent successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}(s) - ${res.error?.data?.message}`, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };
  const selectRef = (ref) => {};
  return (
    <Menu open={isFileMenu} onClose={closeMenuHandler} anchorEl={anchorEl}>
      <div className={`w-[9rem]`}>
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText className="ml-[1rem]">Image</ListItemText>
            <input
              ref={imageRef}
              type="file"
              multiple
              accept="image/png, image/jpg, image/gif"
              className=" hidden"
              onChange={(e) => fileChageHandler(e, "Image")}
            />
          </MenuItem>

          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText className="ml-[1rem]">Audio</ListItemText>
            <input
              ref={audioRef}
              type="file"
              multiple
              accept="audio/mp3, audio/wav, audio/mpeg"
              className=" hidden"
              onChange={(e) => fileChageHandler(e, "Audio")}
            />
          </MenuItem>

          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText className="ml-[1rem]">Video</ListItemText>
            <input
              ref={videoRef}
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              className=" hidden"
              onChange={(e) => fileChageHandler(e, "Video")}
            />
          </MenuItem>

          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText className="ml-[1rem]">Files</ListItemText>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="*"
              className=" hidden"
              onChange={(e) => fileChageHandler(e, "File")}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
