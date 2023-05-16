import { Box, IconButton, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const Container = styled(Box)`
  width: 5vw;
  display: flex;
  justify-content: space-between;
  margin: 0rem 1rem;
  flex-direction: column;
`;

const FooterElement = styled(Box)(({ theme }) => {
  return `
    width: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0rem;
  `;
});

export const Footer = () => {
  const theme = useTheme();

  return (
    <Container>
      <FooterElement>
        <IconButton
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/micha%C5%82-zi%C3%B3%C5%82kowski-699433221/"
            )
          }
          color="secondary"
          sx={{
            width: 32,
            height: 32,
            padding: 3,
            transform: "rotate(270deg)",
            my: 1,
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          onClick={() => window.open("https://github.com/majkizbajki")}
          color="secondary"
          sx={{
            width: 32,
            height: 32,
            padding: 3,
            transform: "rotate(270deg)",
            my: 1,
          }}
        >
          <GitHubIcon />
        </IconButton>
        <Typography
          color={theme.palette.text.primary}
          sx={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            my: 2,
            fontFamily: "Anton",
          }}
        >
          FOLLOW ME
        </Typography>
      </FooterElement>
      <FooterElement>
        <Typography
          color={theme.palette.text.primary}
          sx={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            my: 2,
            fontFamily: "Dancing Script",
          }}
        >
          Michał Ziółkowski
        </Typography>
        <Typography
          color={theme.palette.text.primary}
          sx={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            my: 2,
            fontFamily: "Anton",
          }}
        >
          DESIGNED AND CREATED BY
        </Typography>
      </FooterElement>
    </Container>
  );
};
