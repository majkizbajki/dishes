import { Container } from "@mui/material";
import Lottie from "lottie-react";
import pageNotFoundLottie from "../../assets/lottie/81122-error-404-page-not-found.json";

export const NotFoundPage = () => {
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Lottie
        style={{
          width: "100%",
          height: "100%",
        }}
        animationData={pageNotFoundLottie}
        loop
      />
    </Container>
  );
};
