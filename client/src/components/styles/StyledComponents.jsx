import { Skeleton, TextField, keyframes, styled } from "@mui/material";
import { Link as linkComponent } from "react-router-dom";
const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "react(0 0 0 0)",
  position: "absolute",
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  width: 1,
  whiteSpace: "nowrap",
});

const Link = styled(linkComponent)`
text-decoration: none;
padding: 0rem;
transition: background-color 0.15s ease-in-out 0.1s; 

color: white;
&:hover {
  background-color: rgb(0 ,0 ,0, 0.2); 
`;

const WhiteOutlineTextField = styled(TextField)({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
});

const InputBox = styled("input")`
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: rgb(209, 213, 219);
`;
const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
  backgroundColor: "white",
}));

export {
  bounceAnimation,
  BouncingSkeleton,
  Link,
  VisuallyHiddenInput,
  WhiteOutlineTextField,
  InputBox,
};
