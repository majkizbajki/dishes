import { Box, SxProps, TextField, Theme } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";
import { Rules } from "../../utils/validation";
import { styled } from "@mui/system";

interface IFormInputProps {
  control: Control<any>;
  label: string;
  name: string;
  rules: Rules;
  error?: FieldError;
  errorMessage?: string;
  sx?: SxProps<Theme>;
}

const CustomMUITextField = styled(TextField)(({ theme }) => {
  return `
    width: 100%;
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${theme.palette.secondary.main};
      }
      &.Mui-error fieldset {
        border-color: ${theme.palette.error.main}
      }
    }
  
    & .MuiInputLabel-root {
      &.Mui-focused {
        color: ${theme.palette.secondary.main};
      }
      &.Mui-error {
        color: ${theme.palette.error.main}
      }
    }
    `;
});

export const FormInput = ({
  control,
  label,
  name,
  rules,
  error,
  errorMessage,
  sx,
}: IFormInputProps) => {
  return (
    <Box sx={{ mt: 2, width: 256, ...sx }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <CustomMUITextField
            label={label}
            helperText={error ? errorMessage : undefined}
            FormHelperTextProps={{ style: { marginTop: 8 } }}
            error={Boolean(error)}
            variant="outlined"
            size="small"
            {...field}
          />
        )}
      />
    </Box>
  );
};
