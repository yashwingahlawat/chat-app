import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AvatarCard from "../components/shared/AvatarCard";
import {
  Link,
  WhiteOutlineTextField,
} from "../components/styles/StyledComponents";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import UserItem from "../components/shared/UserItem";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import {
  useAddGroupMemberMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
import { LayoutLoader } from "../components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";

const ConfirmDelete = lazy(() => import("../components/dialogs/ConfirmDelete"));
const AddMember = lazy(() => import("../components/dialogs/AddMember"));

function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const myGroups = useMyGroupsQuery();
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const { isAddMember } = useSelector((state) => state.misc);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const backIcon = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        {!isMobileMenuOpen ? (
          <Tooltip title="Open Group List">
            <IconButton onClick={handleMobile}>
              <MenuOutlinedIcon className=" text-gray-200" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Close Group List">
            <IconButton onClick={handleMobile}>
              <CancelOutlinedIcon className=" text-gray-200" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Tooltip title={"Go Back"}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: ".6rem",
            left: ".8rem",
            bgcolor: "rgb(78, 76, 184, 0.5)",
            ":hover": {
              bgcolor: "rgb(78, 76, 184, 0.8)",
            },
          }}
        >
          <KeyboardBackspaceIcon className="text-gray-200" />
        </IconButton>
      </Tooltip>
    </>
  );

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [grpName, setgrpName] = useState("");
  const [members, setMembers] = useState([]);
  const [updatedGrpName, setupdatedGrpName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const isAddedInGroup = true;
  const [renameGroup, isLoadingRenameGroup] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);

  useEffect(() => {
    if (groupDetails.data) {
      setgrpName(groupDetails.data?.chat?.name);
      setupdatedGrpName(groupDetails.data?.chat?.name);
      setMembers(groupDetails?.data?.chat?.members);
    }

    return () => {
      setgrpName("");
      setupdatedGrpName("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails?.data]);

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const openAddMembersHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const removeMemberHandler = (_id) => {
    removeMember("Removing Member...", { chatId, userId: _id });
  };

  const updateGrpName = () => {
    setIsEdit(false);
    renameGroup("Updating group name...", { chatId, name: updatedGrpName });
    setgrpName(updatedGrpName);
  };

  useEffect(() => {
    if (chatId) {
      setupdatedGrpName(`Group Name ${chatId} `);
      setgrpName(`Group Name ${chatId} `);
    }

    return () => {
      setgrpName("");
      setupdatedGrpName("");
      setIsEdit(false);
    };
  }, [chatId]);

  const deleteHandler = () => {
    deleteGroup("Deleting group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const groupName = (
    <Stack
      direction={"row"}
      spacing={"1rem"}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      {isEdit ? (
        <>
          <WhiteOutlineTextField
            label={"Group Name"}
            value={updatedGrpName}
            onChange={(e) => setupdatedGrpName(e.target.value)}
          />
          <IconButton
            disabled={isLoadingRenameGroup}
            sx={{
              bgcolor: "rgb(0,0,0,0.4)",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.8)",
              },
            }}
            className="w-fit"
            onClick={updateGrpName}
          >
            <TaskAltIcon className=" text-gray-300" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5" className="text-white">
            {grpName && grpName}
          </Typography>
          <IconButton
            disabled={isLoadingRenameGroup}
            sx={{
              bgcolor: "rgb(0,0,0,0.4)",
              ":hover": {
                bgcolor: "rgb(0,0,0,0.8)",
              },
            }}
            className="w-fit"
            onClick={() => setIsEdit(true)}
          >
            <DriveFileRenameOutlineIcon className=" text-gray-300" />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const btnGroup = (
    <Stack
      color={"white"}
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      mt={{ xs: "1rem", sm: "0rem" }}
      spacing={"1rem"}
      padding={{
        xs: 0,
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        onClick={openConfirmDeleteHandler}
        sx={{ color: "gray" }}
        size="small"
      >
        <DeleteIcon className="mr-1" />
        Delete Group
      </Button>
      <Button
        onClick={openAddMembersHandler}
        variant="contained"
        className="mt-1"
        color="success"
        size="small"
      >
        <GroupAddIcon className="mr-2" />
        Add Members
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid overflow={"hidden"} container height={"100vh"} padding={"8px"}>
      <Grid
        component={Paper}
        elevation={3}
        className=" border-2 border-[#ea7070]"
        item
        sx={{
          bgcolor: "transparent",
          padding: "1rem",
          display: {
            xs: "none",
            md: "block",
          },
          overflow: "auto",
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For Internet Explorer and Edge */,
          "&::-webkit-scrollbar": {
            display: "none" /* For Chrome, Safari, and Opera */,
          },
        }}
        md={4}
      >
        <GroupList w="full" myGroups={myGroups?.data?.groups} />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: {
            xs: "1rem 1rem",
            sm: "1rem 3rem",
          },
          alignItems: "center",
        }}
      >
        {!grpName ? (
          <Typography className="text-white">
            Select a group to manage
          </Typography>
        ) : (
          <>
            {groupName}
            <Typography variant="body" className="text-gray-300 self-start ">
              Members
            </Typography>
            <Stack
              component={Paper}
              elevation={5}
              sx={{
                borderRadius: "10px",
                maxWidth: {
                  xs: "100%",
                  sm: "40rem",
                },
                width: "100%",
                boxSizing: "border-box",
                height: "50vh",
                overflow: "auto",
                padding: {
                  xs: "0.5rem",
                  sm: "1rem",
                  md: "1rem 4rem",
                },
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                background: "linear-gradient(to right, #ea7070, #2d295a)",
              }}
              spacing={"1rem"}
            >
              {/* members */}
              {isLoadingRemoveMember ? (
                <CircularProgress
                  sx={{
                    justifySelf: "center",
                  }}
                />
              ) : (
                members.map((user, i) => (
                  <UserItem
                    user={user}
                    key={i}
                    isAddedInGroup={isAddedInGroup}
                    tooltipTitle="remove from group"
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {btnGroup}
          </>
        )}
        {backIcon}
      </Grid>

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDelete
            deleteHandler={deleteHandler}
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
          />
        </Suspense>
      )}

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMember chatId={chatId} />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          width: "50vw",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList myGroups={myGroups?.data?.groups} />
      </Drawer>
    </Grid>
  );
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    sx={{
      "&::-webkit-scrollbar": {
        display: "none",
      },
      boxShadow: "initial",
      scrollbarWidth: "none",
      overflow: "auto",
      height: { xs: "100vh", md: "94vh" },
      padding: {
        sm: "1rem",
        md: 0,
      },
      bgcolor: {
        xs: "#333333",
        md: "transparent",
      },
    }}
    width={w}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group, i) => (
        <GroupListItem key={i} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography
        className="text-white"
        variant="h3"
        padding={"1rem"}
        textAlign={"center"}
      >
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      className=" border-b border-gray-400 shadow-lg w-fit"
    >
      <Stack
        direction={"row"}
        height={"4rem"}
        alignItems={"center"}
        spacing={"2rem"}
        sx={{
          width: {
            xs: "50vw",
            sm: "contain",
          },
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
        </Stack>
      </Stack>
    </Link>
  );
});
export default Groups;
