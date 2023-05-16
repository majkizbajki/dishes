import { SxProps, Theme, useTheme } from "@mui/material/styles";
import { Box, FormHelperText } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import { FieldError, ControllerRenderProps } from "react-hook-form";
import { IFormInput } from "../organisms/DishForm";

interface IFormTimePickerProps {
  fieldProps: ControllerRenderProps<IFormInput, "preparation_time">;
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  error?: FieldError;
  sx?: SxProps<Theme>;
}

export const FormTimePicker = ({
  fieldProps,
  label,
  value,
  onChange,
  error,
  sx,
}: IFormTimePickerProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mb: 1,
        mt: error ? 0.5 : 1,
        width: 256,
        ...sx,
      }}
    >
      <TimePicker
        {...fieldProps}
        value={value}
        onChange={onChange}
        views={["hours", "minutes", "seconds"]}
        format="HH:mm:ss"
        label={label}
        ampm={false}
        sx={{
          width: "100%",
          height: 40,
          "& .MuiOutlinedInput-root": {
            height: 40,
            "& fieldset": {
              borderColor: error ? theme.palette.error.main : undefined,
            },
            "&:hover fieldset": {
              borderColor: error ? theme.palette.error.main : undefined,
            },
            "&.Mui-focused fieldset": {
              borderColor: error
                ? theme.palette.error.main
                : theme.palette.secondary.main,
            },
            "&.Mui-error fieldset": {
              borderColor: error
                ? theme.palette.error.main
                : theme.palette.secondary.main,
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: error
                ? theme.palette.error.main
                : theme.palette.secondary.main,
            },
            "&.Mui-error": {
              color: error
                ? theme.palette.error.main
                : theme.palette.secondary.main,
            },
            color: error ? theme.palette.error.main : undefined,
          },
          "& .MuiSvgIcon-root": {
            color: error ? theme.palette.error.main : undefined,
          },
          "& .MuiOutlinedInput-input": {
            padding: 1,
          },
          "& .MuiFormLabel-root[data-shrink=false]": { top: -6 },
        }}
      />
      {error && (
        <FormHelperText sx={{ ml: 2, mt: 1, color: theme.palette.error.main }}>
          {error?.type === "required" ? "Required" : error.message}
        </FormHelperText>
      )}
    </Box>
  );
};
