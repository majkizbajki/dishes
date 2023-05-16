import { Box, Typography } from "@mui/material";
import { Title } from "../atoms";
import { DishForm } from "../organisms";
import { styled as MUIStyled } from "@mui/system";
import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/images/logo.png";
import soup from "../../assets/images/soup.jpg";
import sandwich from "../../assets/images/sandwich.jpg";
import pizza from "../../assets/images/pizza.jpg";

const FormContainer = MUIStyled(Box)(({ theme }) => {
  return `
    display: flex;
    flex: 0.3;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.primary.main};

    @media (max-width: 1100px) {
      flex: 1;
      margin-right: 1rem;
    }
  `;
});

const ImageContainer = MUIStyled(Box)`
  display: flex;
  flex: 0.2;

  @media (max-width: 1100px) {
    flex: 0;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  transition: transform 0.3s ease;

  &:hover {
    --webkit-transform: scale(0.9);
    transform: scale(0.9);
    --webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  @media (max-width: 1100px) {
    width: 0;
  }
`;

export const Layout = () => {
  const [showForm, setShowForm] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "space-evenly",
        paddingY: 4,
      }}
    >
      {!showForm && (
        <>
          <FormContainer
            onClick={() => setShowForm(true)}
            sx={{ cursor: "pointer" }}
          >
            <Title
              title={"DISHES"}
              sx={{
                fontFamily: "Anton",
                fontSize: 96,
                color: theme.palette.secondary.main,
              }}
            />
            <img
              alt="logo"
              src={logo}
              style={{
                width: 242,
                height: 280,
                marginTop: "4rem",
              }}
            />
            <Typography
              sx={{
                mt: 8,
                fontStyle: "italic",
                fontWeight: "400",
              }}
              color={theme.palette.secondary.main}
            >
              Click to continue...
            </Typography>
          </FormContainer>
          <ImageContainer>
            <Image alt="soup" src={soup} />
          </ImageContainer>
          <ImageContainer>
            <Image alt="sandwich" src={sandwich} />
          </ImageContainer>
          <ImageContainer>
            <Image alt="pizza" src={pizza} />
          </ImageContainer>
        </>
      )}
      {showForm && (
        <>
          <FormContainer>
            <Title
              title={"DISHES"}
              sx={{
                fontFamily: "Anton",
                fontSize: 96,
                color: theme.palette.secondary.main,
              }}
            />
            <DishForm />
          </FormContainer>
          <ImageContainer>
            <Image alt="soup" src={soup} />
          </ImageContainer>
          <ImageContainer>
            <Image alt="sandwich" src={sandwich} />
          </ImageContainer>
          <ImageContainer>
            <Image alt="pizza" src={pizza} />
          </ImageContainer>
        </>
      )}
    </Box>
  );
};
