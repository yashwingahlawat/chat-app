import { Grid, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid container sx={{ height: "98vh", m: "1rem" }} spacing={"1rem"}>
      <Grid
        component={Paper}
        elevation={3}
        item
        sm={4}
        md={3}
        sx={{
          mt: 1,
          height: "97%",
          display: { xs: "none", sm: "block" },
          padding: 2,
          bgcolor: "transparent",
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        sx={{ mt: 1, height: "97%", p: 1 }}
      >
        <Stack spacing={"1rem"}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
            <Skeleton key={i} variant="rectangular" height={"5rem"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        component={Paper}
        elevation={3}
        item
        sx={{
          height: "97%",
          mt: 1,

          display: { xs: "none", md: "block" },
          padding: 2,
          bgcolor: "transparent",
        }}
        md={4}
        lg={3}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.55s",
        }}
      />
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
