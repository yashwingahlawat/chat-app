import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoNobg.png";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const [isLogin, setIsLogin] = useState(true);
  const secretKey = useInputValidation("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };
  useEffect(() => {
    if (isAdmin) return navigate("/admin/dashboard");
  }, [isAdmin]);
  return (
    <Container
      className={`gradient ${!isLogin ? "h-fit" : "h-[100vh]"}`}
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
        <div className="flex flex-col gap-3 items-center">
          <img className="h-[5rem] w-[5rem] rounded-[100%]" src={logo} alt="" />
          <Typography sx={{ fontWeight: 700 }} variant="h5">
            ADMIN LOGIN
          </Typography>
        </div>
        <form onSubmit={handleLogin} className=" w-full mt-[1rem]">
          <TextField
            label="secretKey"
            margin="normal"
            required
            fullWidth
            type="text"
            name="secretKey"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
          />
          {secretKey.error && (
            <Typography color="error" variant="caption">
              {secretKey.error}
            </Typography>
          )}

          <Button
            fullWidth
            sx={{ mt: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
