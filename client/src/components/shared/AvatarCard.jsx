import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { tranformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 2 }) => {
  return (
    <Stack direction={"row"} spacing={1}>
      <AvatarGroup className="relative" max={max}>
        <Box height={"3rem"} width={"5rem"}>
          {avatar.map((a, i) => (
            <Avatar
              src={tranformImage(a)}
              key={i}
              sx={{
                border: "2px solid white !important",
                width: "2.5rem",
                height: "2.5rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + i}rem`,
                  sm: `${0.6 + i}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
