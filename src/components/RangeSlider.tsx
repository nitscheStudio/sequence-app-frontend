import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type RangeSliderProps = {
  bpmRange: number[];
  setBpmRange: React.Dispatch<React.SetStateAction<number[]>>;
};

function valuetext(value: number) {
  return `${value}BPM`;
}

export default function RangeSlider({
  bpmRange,
  setBpmRange,
}: RangeSliderProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setBpmRange(newValue as number[]);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        sx={{
          color: "#03b276", // change the color of the slider
          "& .MuiSlider-rail": {
            color: "gray", // change the color of the rail
          },
          "& .MuiSlider-track": {
            color: "#03b276", // change the color of the track
          },
          "& .MuiSlider-thumb": {
            color: "#03b276",
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0px 0px 0px 8px rgba(0, 224, 147, 0.16)", // change the color of the thumb on hover and focus
            },
            "&.Mui-active": {
              boxShadow: "0px 0px 0px 14px rgba(0, 224, 147, 0.16)", // change the color of the ripple effect on active state
            },
          },
          "& .MuiSlider-thumb.Mui-focusVisible::before": {
            boxShadow: "0px 0px 0px 8px rgba(0, 224, 147, 0.04)", // change the color of the ripple effect on hover
          },
          "& .MuiSlider-thumb.Mui-active::after": {
            boxShadow: "0px 0px 0px 14px rgba(0, 224, 147, 0.02)", // change the color of the ripple effect on active state
          },
        }}
        getAriaLabel={() => "BPM Range"}
        value={bpmRange}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
        min={40}
        max={240}
      />
      {/* <Box display="flex" justifyContent="space-between">
        <Typography>{bpmRange[0]} </Typography>

        <Typography>
          {bpmRange[0] === bpmRange[1] ? "" : bpmRange[1]}
        </Typography>
      </Box> */}
    </Box>
  );
}
