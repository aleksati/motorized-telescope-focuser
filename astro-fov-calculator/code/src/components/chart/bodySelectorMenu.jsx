import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";

// prop:
// isEyepieceMode
// colors

const MENUPAPER_HEIGHT = 48;

const style = (props) => ({
  style: {
    maxHeight: MENUPAPER_HEIGHT * 4.5,
    width: "20ch",
    background: "black",
    color: "white",
    borderRadius: 20,
  },
  sx: {
    "& .MuiMenuItem-root": {
      borderRadius: 20,
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: props.isEyepieceMode
        ? "rgba(25, 118, 210, 0.2)"
        : "rgba(25, 210, 118, 0.2)",
    },
    "& .MuiMenuItem-root:hover": {
      border: props.isEyepieceMode
        ? "1px solid rgba(25, 118, 210, 1)"
        : "1px solid rgba(25, 210, 118, 1)",
    },
    // "& .MuiMenuItem-root.Mui-selected:hover": {
    //   backgroundColor: props.isEyepieceMode
    //     ? "rgba(25, 118, 210, 0.3)"
    //     : "rgba(25, 210, 118, 0.3)",
    // },
  },
});

const BodySelectorMenu = (props) => {
  const paperPropsStyle = style(props);
  const [options, setOptions] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setOptions(props.crowdArray);
  }, [props.crowdArray]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color={
          props.isEyepieceMode
            ? props.colors.eyepieceMode
            : props.colors.cameraMode
        }
        aria-label="more"
        id="body-selector-menu"
        aria-controls={open ? "body-selector-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="body-selector-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        PaperProps={paperPropsStyle}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            id={option}
            selected={option === props.currentCrowd}
            onClick={(e) => {
              props.onCrowdSelection(e.target.id);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BodySelectorMenu;
