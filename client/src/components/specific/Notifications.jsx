import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { tranformImage } from "../../lib/features";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotifications } from "../../redux/reducers/misc";
import { setNotificationCount } from "../../redux/reducers/chat";
const Notifications = ({ isNotifications }) => {
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  useErrors([{ error, isError }]);
  const handleClose = () => dispatch(setIsNotifications(false));

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
  const friendRequestHandler = async ({ _id, accept }) => {
    await acceptRequest("Responding to friend request...", {
      requestId: _id,
      accept,
    });

    dispatch(setIsNotifications(false));
  };

  return (
    <Dialog open={isNotifications} onClose={handleClose}>
      <Stack
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ea7070",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
          },
          background: "linear-gradient(to right, #ea7070, #2d295a)",
        }}
        padding={{ xs: ".5rem", sm: "1rem" }}
        width={{ xs: "100%", sm: "25rem" }}
      >
        <DialogTitle className="text-white" textAlign={"center"}>
          Notifications
        </DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              <>
                {" "}
                {data?.allRequests.map((n, i) => (
                  <NotificationItem
                    sender={n.sender}
                    _id={n._id}
                    handler={friendRequestHandler}
                    key={i}
                  />
                ))}{" "}
              </>
            ) : (
              <Typography className="text-white text-center">
                No Notifications
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export default Notifications;

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem className="border-b thext-slate-200 border-b-slate-400">
      <Stack
        direction={"column"}
        alignItems={"center"}
        spacing={".5rem"}
        width={"100%"}
        marginBottom={"1rem"}
      >
        <div className="flex gap-3 items-center">
          <Avatar
            sx={{
              border: "1px solid white",
            }}
            src={tranformImage(avatar)}
          />
          <Typography
            className="text-white"
            variant="body2"
            sx={{
              flexGrow: 1,

              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              overflow: "wrap",
            }}
          >
            {name} sent you a friend Request
          </Typography>
        </div>
        <Stack direction={"row"} gap={1}>
          <Button
            color="success"
            sx={{
              padding: 0.2,
            }}
            variant="contained"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{
              padding: 0.2,
            }}
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
