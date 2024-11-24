import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tranformImage } from "../../lib/features";
const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  tooltipTitle = "Add friend",
  tooltipTitleAdd = "",
  tooltipTitleRemove = "",
  isAddedInGroup,
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem className="border-b w-[100%] text-slate-200 border-b-slate-400">
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100vw"}
      >
        <Avatar
          sx={{
            border: "1px solid white",
          }}
          src={avatar}
        />
        <Typography
          variant="body2"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>

        {}

        <IconButton
          sx={{
            bgcolor: isAddedInGroup ? "rgb(150,0,0,0.6)" : "rgb(0,150,0,0.6)",
            color: "white",
            ":hover": {
              bgcolor: isAddedInGroup ? "rgb(100,0,0,0.9)" : "rgb(0,100,0,0.9)",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAddedInGroup ? (
            <Tooltip
              title={tooltipTitleRemove ? tooltipTitleRemove : tooltipTitle}
            >
              <RemoveOutlinedIcon />
            </Tooltip>
          ) : (
            <Tooltip
              title={tooltipTitleRemove ? tooltipTitleAdd : tooltipTitle}
            >
              <AddOutlinedIcon />
            </Tooltip>
          )}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
