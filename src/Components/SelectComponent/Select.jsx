import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SubmitButton from "../Buttons/SubmitButton";

export default function CustomSelect({ options = [], value, setValue, label }) {
  const selectRef = React.useRef(null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleReset = () => {
    setValue("");
    selectRef.current.blur();
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        width: "200px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          key={value}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          ref={selectRef}
        >
          {options.map((el) => {
            return <MenuItem value={el?.name}>{el?.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <SubmitButton
        text={"Reset"}
        classNames={"px-4"}
        handleOnClick={handleReset}
      />
    </Box>
  );
}
