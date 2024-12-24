import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "0",
  position: "absolute",
  right: 20,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter,
  }),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    border: "1px solid transparent",
    borderRadius: "4px",
    "&:focus-within": {
      borderColor: "#B0B0B0",
    },
  },
}));

const SearchBox = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const inputRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setExpanded(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleFocus = () => {
    setExpanded(true);
  };

  const handleBlur = () => {
    if (searchText.length === 0) {
      setExpanded(false);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (searchText.length === 0) {
          setExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchText]);

  return (
    <IconButton
      onClick={handleClick}
      sx={{ position: "relative" }}
      disableRipple
    >
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchText}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          width: expanded ? "200px" : "0",
          transition: "width 0.3s ease",
        }}
      />
      <SearchIcon sx={{ position: "absolute", left: 0 }} />
      {searchText.length > 0 && (
        <IconButton
          onClick={handleClearSearch}
          sx={{
            position: "absolute",
            right: 15,
            padding: "0 10px",
            color: "#B0B0B0",
          }}
        >
          <ClearIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </IconButton>
  );
};

export default SearchBox;
