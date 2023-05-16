import { SxProps, Theme, Typography } from "@mui/material";

interface ITitleProps {
  title: string;
  sx?: SxProps<Theme> | undefined;
}

export const Title = ({ title, sx }: ITitleProps) => {
  return (
    <Typography variant="h3" fontFamily="roboto" sx={{ ...sx }}>
      {title}
    </Typography>
  );
};
