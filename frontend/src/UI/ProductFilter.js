// https://mui.com/components/selects/
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as React from "react";
import { useSelector } from "react-redux";

export default function SelectLabels() {
  const [material, setMaterial] = React.useState("");
  const ml = useSelector((state) => state.robo.materialList);

  const handleChange = (event) => {
    setMaterial(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={material}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {ml.map((material) => (
            <MenuItem value={material} key={material}>
              {material}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select An Option</FormHelperText>
      </FormControl>
    </div>
  );
}
