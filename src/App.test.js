import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ElementContextRoute } from "./context/RouteContext";
import { ElementContextPopUp } from "./context/PopUpContext";

// Mock contexts
const mockRouteContext = (route = "Login") => ({
  route,
  setLoginToken: jest.fn(),
  changeRoute: jest.fn(),
  registerFlow: { current: false },
  persistLogin: jest.fn(),
  hasSavedData: jest.fn(),
  deleteSavedItems: jest.fn(),
});

const mockPopUpContext = (
  popUpText = "",
  popUpTitle = "",
  popUpLoading = false
) => ({
  popUpText,
  closePopUp: jest.fn(),
  popUpTitle,
  popUpLoading,
});

const renderWithContexts = ({
  route = "Login",
  popUpText = "",
  popUpTitle = "",
  popUpLoading = false,
} = {}) =>
  render(
    <ElementContextRoute.Provider value={mockRouteContext(route)}>
      <ElementContextPopUp.Provider
        value={mockPopUpContext(popUpText, popUpTitle, popUpLoading)}
      >
        <App />
      </ElementContextPopUp.Provider>
    </ElementContextRoute.Provider>
  );

describe("App", () => {


  it("renders pop up when popUpText is set", () => {
    renderWithContexts({ popUpText: "Test PopUp", popUpTitle: "Title" });
    expect(screen.getByText("Test PopUp")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
  });

  it("renders loading pop up when popUpLoading is true", () => {
    renderWithContexts({ popUpLoading: true });
    expect(screen.getByAltText("loading")).toBeInTheDocument();
  });
});