import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Avatar, Stack, Typography } from "@mui/material";
import logo from "../assets/logoNobg.png";
function Home() {
  return (
    <Stack position={"relative"}>
      <Typography
        sx={{
          width: {
            xs: "70%",
            sm: "70%",
            md: "80%",
          },
          marginTop: {
            xs: "2rem",
            sm: ".4rem",
          },
        }}
        position="absolute"
        left={"9%"}
        textAlign={"center"}
        className="text-white  p-1  font-bold border 2shadow-xl "
        variant="h4"
      >
        Welcome Chatifyter
      </Typography>
      <img
        src={logo}
        className=" opacity-40  overflow-hidden object-top h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5rem)] w-auto"
        alt=""
      />

      <Typography
        sx={{
          width: {
            xs: "80%",
            sm: "55%",
            md: "80%",
          },
        }}
        position="absolute"
        left={"9%"}
        bottom="1rem"
        className="text-white font-bold p-1 shadow-2xlcflex border"
        variant="h4"
        textAlign={"center"}
      >
        Select a friend to Chat
      </Typography>
    </Stack>
  );
}

export default AppLayout()(Home);
