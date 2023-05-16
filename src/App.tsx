import "./App.css";
import { useRoutes } from "react-router-dom";
import { DishesPage } from "./pages/DishesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { theme } from "./constants/themes";

function App() {
  const muiTheme = createTheme({
    palette: {
      background: {
        default: theme.colors.background,
      },
      primary: {
        main: theme.colors.primary,
      },
      secondary: {
        main: theme.colors.secondary,
      },
      text: {
        primary: theme.colors.text,
      },
    },
  });

  const routes = useRoutes([
    {
      path: "/dishes",
      element: <DishesPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <ThemeProvider theme={muiTheme}>{routes}</ThemeProvider>;
}

export default App;
