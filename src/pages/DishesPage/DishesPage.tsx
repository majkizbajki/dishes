import { Box } from "@mui/material";
import { Footer } from "../../components/organisms/Footer";
import { Layout } from "../../components/templates/Layout";

export const DishesPage = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Footer />
      <Layout />
    </Box>
  );
};
