import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { Rules } from "../../utils/validation";
import { SxProps, Theme, useTheme } from "@mui/material/styles";

export type SelectValueType = {
  name: string;
  value: string;
  icon?: ReactNode;
};

interface IFormSelectProps {
  control: Control<any>;
  label: string;
  name: string;
  rules: Rules;
  selectValues: SelectValueType[];
  value: string;
  onChange: (value: any) => void;
  error?: FieldError;
  errorMessage?: string;
  sx?: SxProps<Theme>;
}

export const FormSelect = ({
  control,
  label,
  name,
  rules,
  selectValues,
  value,
  onChange,
  error,
  errorMessage,
  sx,
}: IFormSelectProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 1, width: 256, ...sx }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormControl
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
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
                  borderColor: theme.palette.error.main,
                },
              },
            }}
            size="small"
          >
            <InputLabel
              sx={{
                "&.Mui-error": {
                  color: theme.palette.error.main,
                },
                "&.Mui-focused": {
                  color: error
                    ? theme.palette.error.main
                    : theme.palette.secondary.main,
                },
                color: error ? theme.palette.error.main : undefined,
              }}
            >
              {label}
            </InputLabel>
            <Select
              {...field}
              variant="outlined"
              value={value}
              label={label}
              error={Boolean(error)}
              placeholder={label}
              onChange={(event) => onChange(event.target.value)}
              sx={{
                "& .MuiSvgIcon-root": {
                  color: error ? theme.palette.error.main : undefined,
                },
              }}
            >
              {selectValues.map((item) => {
                return (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            {error && errorMessage && (
              <FormHelperText
                sx={{ ml: 2, mt: 1, color: theme.palette.error.main }}
              >
                {errorMessage}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};
