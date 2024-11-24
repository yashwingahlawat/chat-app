import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMember = ({ chatId }) => {
  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMemberMutation
  );
  const [selectedMembers, setselectedMembers] = useState([]);

  const selectMembersHandler = (_id) => {
    setselectedMembers((prev) =>
      prev.includes(_id)
        ? prev.filter((current) => current !== _id)
        : [...prev, _id]
    );
  };
  const dispatch = useDispatch();

  useEffect(() => { }, [selectedMembers]);

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const navigate = useNavigate();
  const addGroupHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });

    closeHandler();
  };

  useErrors([{ isError, error }]);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack padding={"1rem"} className=" text-gray-400 bg-[#333333]">
        <DialogTitle textAlign={"center"} className=" bg-[#333333]">
          Add Members
        </DialogTitle>

        <Stack
          alignItems={"center"}
          width={"25vw"}
          height={"50vh"}
          overflow={"auto"}
          sx={{
            minWidth: "101%",

            "&::-webkit-scrollbar": {
              width: "1px",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ea7070",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
            },
          }}
          spacing={"1rem"}
        >
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((user, i) => (
              <UserItem
                isAddedInGroup={selectedMembers?.includes(user._id)}
                key={i}
                handler={() => selectMembersHandler(user._id)}
                user={user}
                tooltipTitleAdd={"Add to Group"}
                tooltipTitleRemove={"Remove from Group"}
                handlerIsLoading={isLoadingAddMembers}
              />
            ))
          ) : (
            <>
              <Typography>Aawww, You don't have any friends. </Typography>
              <img
                className="h-[240px] w-[300px]"
                src="https://imgs.search.brave.com/oXRGDoBRuA9ak_r__OSN5UXWG4KfTfBV8kUSzftUL-4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zYWQt/a2l0dGVuLTE0Mzgz/MDQxLmpwZw"
                alt=""
              />
            </>
          )}
        </Stack>
        <div className=" flex mt-4 justify-end gap-2">
          <Button
            onClick={closeHandler}
            sx={{
              color: "#ea7070",
            }}
          >
            Close
          </Button>
          <Button
            onClick={addGroupHandler}
            sx={{
              bgcolor: "rgb(78, 76, 184)",
              ":hover": {
                bgcolor: "rgb(78, 76, 184,0.7)",
              },
            }}
            disabled={isLoadingAddMembers}
            variant="contained"
          >
            Save Changes
          </Button>
        </div>
      </Stack>
    </Dialog>
  );
};

export default AddMember;
