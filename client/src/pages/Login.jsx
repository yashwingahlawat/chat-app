import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import logo from "../assets/logoNobg.png";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useRating } from "6pp";
import {
  fullNameValidator,
  usernameValidator,
} from "../utils/usernameValidator";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const fullName = useInputValidation("", fullNameValidator);
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single", 5);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Registering...");
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", fullName.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong",
        {
          id: toastId,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundImage: 'linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))'
    }}>
      <Container
        className={`${!isLogin ? "h-fit" : "h-[100vh]"}`}
        component="main"
        sx={{
          padding: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Paper
          className="w-[90%] lg:max-w-[45%]"
          elevation={4}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <div className="flex flex-col gap-3 items-center">
                <img
                  className="h-[5rem] w-[5rem] rounded-[100%]"
                  src={logo}
                  alt=""
                />
                <Typography sx={{ fontWeight: 700 }} variant="h5">
                  LOGIN
                </Typography>
              </div>
              <form onSubmit={handleLogin} className=" w-full mt-[1rem]">
                <TextField
                  label="Username"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="username"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  label="Password"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  name="password"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  fullWidth
                  sx={{ mt: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </Button>
                <div className="flex gap-3">
                  <Typography variant="body2" sx={{ mt: "1rem", p: 0 }}>
                    New to Chatify?
                  </Typography>

                  <Button
                    sx={{ mt: "1rem", p: 0 }}
                    onClick={toggleLogin}
                    variant="text"
                    disabled={isLoading}
                  >
                    Register
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3 items-center">
                <img
                  className="h-[5rem] w-[5rem] rounded-[100%]"
                  src={logo}
                  alt=""
                />
                <Typography sx={{ fontWeight: 700 }} variant="h5">
                  REGISTER
                </Typography>
              </div>
              <form onSubmit={handleRegister} className=" w-full mt-[1rem]">
                <Stack position="relative" width="10rem" margin="auto">
                  <Avatar
                    src={avatar.preview}
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                  />
                  {/* Regular input for file selection */}
                  <VisuallyHiddenInput
                    type="file"
                    id="fileInput"
                    onChange={avatar.changeHandler}
                  />
                  {/* IconButton to trigger file selection */}
                  <label htmlFor="fileInput">
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        color: "white",
                        bgcolor: "rgb(0,0,0,0.5)",
                        ":hover": { bgcolor: "rgb(0,0,0,0.8)" },
                      }}
                      component="span"
                    >
                      <CameraAltIcon />
                    </IconButton>
                  </label>
                </Stack>
                {avatar.error && (
                  <Typography
                    sx={{
                      m: "1rem auto",
                      width: "fit-content",
                      display: "block",
                    }}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  label="Fullname"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="name"
                  value={fullName.value}
                  onChange={fullName.changeHandler}
                />
                {fullName.error && (
                  <Typography color="error" variant="caption">
                    {fullName.error}
                  </Typography>
                )}
                <TextField
                  label="Bio"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="bio"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  label="Username"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="username"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  label="Password"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  name="password"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  fullWidth
                  sx={{ mt: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Register
                </Button>
                <div className="flex gap-3">
                  <Typography variant="body2" sx={{ mt: "1rem", p: 0 }}>
                    Already a Chatify Member?
                  </Typography>

                  <Button
                    sx={{ mt: "1rem", p: 0 }}
                    onClick={toggleLogin}
                    variant="text"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
