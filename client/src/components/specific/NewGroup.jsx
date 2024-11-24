import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { WhiteOutlineTextField } from "../styles/StyledComponents";
import { useInputValidation } from "6pp";
import { useDispatch } from "react-redux";
import { setIsNewGroup } from "../../redux/reducers/misc";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import toast from "react-hot-toast";
const NewGroup = ({ isNewGroup }) => {
  const groupName = useInputValidation("");

  const [selectedMembers, setselectedMembers] = useState([]);
  const dispatch = useDispatch();
  const { data, isError, error, isLoading } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMembersHandler = (_id) => {
    setselectedMembers((prev) =>
      prev.includes(_id)
        ? prev.filter((current) => current !== _id)
        : [...prev, _id]
    );
  };
  useEffect(() => { }, [selectedMembers]);

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };
  const handleClose = () => dispatch(setIsNewGroup(false));

  return (
    <Dialog open={isNewGroup} onClose={handleClose}>
      <Stack
        sx={{
          background: "linear-gradient(to right, #ea7070, #2d295a)",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ea7070",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
          },
        }}
        padding={{ xs: "1rem", sm: "2rem" }}
        width={{ xs: "100%", sm: "25rem" }}
      >
        <DialogTitle variant="h4" className="text-white" textAlign={"center"}>
          New Group
        </DialogTitle>
        <WhiteOutlineTextField
          placeholder="Group name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          size="small"
        />
        <Typography
          variant="h6"
          sx={{
            width: "10rem",
            margin: "auto",
            borderBottom: "1px solid white",
            color: "white",
            letterSpacing: "2px",
            marginY: "1rem",
          }}
          textAlign={"center"}
        >
          Members
        </Typography>
        <Stack maxWidth={"100%"}>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user, i) => (
              <UserItem
                isAddedInGroup={selectedMembers.includes(user._id)}
                tooltipTitleAdd={"Add to group"}
                tooltipTitleRemove={"Remove from group"}
                user={user}
                key={i}
                handler={selectMembersHandler}
              />
            ))
          )}
        </Stack>

        <Stack
          gap={"1rem"}
          marginTop={"1rem"}
          justifyContent={"space-around"}
          direction={"row"}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: "rgb(255,255,255,0.6)",
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoadingNewGroup}
            onClick={submitHandler}
            variant="contained"
            color="success"
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
