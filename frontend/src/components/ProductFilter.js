// https://mui.com/components/selects/
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roboActions } from "../store/robo-slice";

export default function SelectLabels() {
  const dispatch = useDispatch();
  const [material, setMaterial] = useState("");
  const ml = useSelector((state) => state.robo.materialList);

  const handleChange = (event) => {
    const selectedVal = event.target.value;
    setMaterial((prevState) => {
      return event.target.value;
    });
    dispatch(roboActions.filterItems({ filterValue: event.target.value }));
    dispatch(roboActions.filterValue({ filterValue: selectedVal }));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={material}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "& .MuiSelect-select": {
              paddingTop: 0.5,
              paddingBottom: 0.5,
            },
          }}
        >
          <MenuItem value="">Select All</MenuItem>
          {ml.map((material) => (
            <MenuItem value={material} key={material}>
              {material}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
