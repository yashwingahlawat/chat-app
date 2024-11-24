import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useFetchData } from "6pp";
import {
  Container,
  Stack,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
  Skeleton,
} from "@mui/material";
import { LayoutLoader } from "../../components/layout/Loaders";
import CommentIcon from "@mui/icons-material/Comment";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import moment from "moment";
import { WhiteOutlineTextField } from "../../components/styles/StyledComponents";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import { DougnutChart, LineChart } from "../../components/specific/Charts";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
moment.locale("en"); // Set locale to English
const Appbar = (
  <Paper
    className="blueGradient"
    elevation={4}
    sx={{
      padding: {
        xs: "1rem",
        sm: "2rem",
      },

      borderRadius: "1rem",
      margin: "3rem 0",
      color: "white",
    }}
  >
    <Stack
      width={"contain"}
      direction={{
        xs: "column",
        sm: "row",
      }}
      alignItems={"center"}
      spacing={"1rem"}
    >
      <AdminPanelSettingsIcon
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "3rem",
          },
        }}
      />
      <WhiteOutlineTextField
        placeholder="search..."
        sx={{
          width: {
            xs: "100%",
            sm: "auto",
          },
        }}
      />
      <Tooltip title="Search">
        <div>
          <IconButton
            sx={{
              width: "3.1rem",
              color: "white",
              display: { xs: "none", sm: "block" },
            }}
            variant="outlined"
          >
            <SearchIcon />
          </IconButton>
          <Button
            sx={{
              mb: 0,
              border: "1px solid white",
              borderRadius: "10px",
              color: "white",
              display: { xs: "block", sm: "none" },
            }}
          >
            Search
          </Button>
        </div>
      </Tooltip>
      <Box sx={{ flexGrow: 1 }} />
      <Typography sx={{ display: { xs: "none", sm: "block" } }}>
        {moment().format("dddd Do MMMM YYYY, hh:mm a")}
      </Typography>
      <Tooltip title="Notifications">
        <IconButton sx={{ color: "white" }}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  </Paper>
);
const Widget = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    className="blueGradient"
    sx={{
      color: "white",
      padding: "2rem",
      borderRadius: "1rem",
      width: {
        xs: "15rem",
        sm: "20rem",
      },
    }}
  >
    <Stack alignItems={"center"} justifyContent={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgb(255,255,255,0.7)",
          borderRadius: "50%",
          border: "5px solid white",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );
  const { stats } = data || {};
  useErrors([
    {
      isError: error,
      error,
    },
  ]);

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      padding={"1rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget
        title={"Users"}
        icon={<PersonIcon />}
        value={stats?.usersCount || 0}
      />
      <Widget
        title={"Chats"}
        icon={<GroupsIcon />}
        value={stats?.totalChatsCount || 0}
      />
      <Widget
        title={"Messages"}
        icon={<CommentIcon />}
        value={stats?.messagesCount}
      />
    </Stack>
  );
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container className=" text-center">
          {Appbar}
          <Stack
            alignItems={"center"}
            direction={{
              xs: "column",
              lg: "row",
            }}
            spacing={"1rem"}
            flexWrap={"wrap"}
          >
            <Paper
              className="blueGradient"
              sx={{
                color: "white",
                padding: "3rem 3.5rem",
                width: "100%",
                maxWidth: "30rem",
                borderRadius: "1rem",
              }}
              elevation={3}
            >
              <Typography variant="h4" margin={"2rem 0"}>
                Last Messages
              </Typography>
              {<LineChart value={stats?.messagesChart || []} />}
            </Paper>
            <Paper
              elevation={3}
              className="blueGradient"
              sx={{
                mt: {
                  xs: "1rem",
                  md: 0,
                },
                color: "white",
                padding: "1rem",
                width: {
                  xs: "100%",
                  sm: "50%",
                },
                position: "relative",
                maxWidth: "22rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "1rem",
              }}
            >
              {
                <DougnutChart
                  value={[
                    stats?.totalChatsCount - stats?.groupsCount,
                    stats?.groupsCount || 0,
                  ]}
                  labels={["Single Chats", "Group Chats"]}
                />
              }

              <Stack
                spacing={"0.5rem"}
                direction={"row"}
                sx={{
                  position: "absolute",

                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <GroupsIcon /> <Typography>Vs</Typography> <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
