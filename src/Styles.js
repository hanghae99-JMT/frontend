import { createTheme, styled } from "@mui/material/styles";
import {
  indigo,
  blueGrey,
  amber,
  deepOrange,
  red,
  blue,
} from "@mui/material/colors";
import { Typography, AppBar, Box, TextField } from "@mui/material";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";

export const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#FF6900",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#559C02",
      contrastText: "#FFFFFF"
    },
  },
  typography: {
    fontFamily: 'SBAggroM',
    h5: {
      // fontFamily: '"Black Han Sans", sans-serif'
    },
  },
});

export const Logo = (props) => {
  return (
    <div
    onClick={props.onClick}
      style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor:
    "pointer" }}
    >
      <Typography
        variant="h3"
        component="div"
        style={{ fontWeight: "900", fontFamily: 'Vitro_core', color: "#FF6900" }}
      >
        JMT
      </Typography>
    </div>
  );
};

// export const Logo = styled(Typography)(({theme}) => ({
//     fontWeight: "900",
//     fontStyle: "italic"
// }))
export const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: `0 1px 10px #eee`,
  // boxShadow: `0 0px 100vh ${theme.palette.secondary.main}`,
  // borderBottom: `1px solid ${theme.palette.secondary.main}`
}));

export const UserTextField = styled(TextField)`
    display: block;
    input{
        background-color: white;
        border-radius: inherit;
    }
    p{
        white-space: pre;
    }
`