import { Avatar, Stack, Typography, colors } from "@mui/material";
import React, { memo } from "react";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { tranformImage } from "../../lib/features";
const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src={tranformImage(user?.avatar?.url)}
        alt="https://www.pngmart.com/files/23/Gigachad-PNG-Isolated-HD.png"
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />

      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<AlternateEmailOutlinedIcon />}
      />

      <ProfileCard
        heading={"Fullname"}
        text={user?.name}
        Icon={<AccountCircleOutlinedIcon />}
      />

      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarMonthIcon />}
      />
    </Stack>
  );
};

export default memo(Profile);

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    spacing={".5rem"}
    alignItems={"center"}
    textAlign={"center"}
    color={"white"}
  >
    {Icon && Icon}

    <Stack spacing={"0.1rem"}>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
