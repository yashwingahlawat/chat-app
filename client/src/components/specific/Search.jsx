import { useInputValidation } from "6pp";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import { WhiteOutlineTextField } from "../styles/StyledComponents";
import toast from "react-hot-toast";
const Search = ({ isSearch }) => {
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const addFriendHandler = (_id) => {
    sendFriendRequest("Sending Friend request...", { userId: _id });
  };
  const [users, setUsers] = useState([]);
  const search = useInputValidation("");
  const dispatch = useDispatch();
  const searchCloseHandler = () => dispatch(setIsSearch(false));
  const [searchUser] = useLazySearchUserQuery();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.value) {
        searchUser(search.value)
          .then(({ data }) => {
            setUsers(data.users);
          })
          .catch((e) => toast.error(e));
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        sx={{
          background: "linear-gradient(to right, #ea7070, #2d295a)",
          overflow: "auto",
          height: "97%",
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
        <DialogTitle variant="h5" className="text-white" textAlign={"center"}>
          Find Chatifyters
        </DialogTitle>
        <WhiteOutlineTextField
          size="small"
          value={search.value}
          onChange={search.changeHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon className="text-white" />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user, i) => (
            <UserItem
              user={user}
              key={i}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
