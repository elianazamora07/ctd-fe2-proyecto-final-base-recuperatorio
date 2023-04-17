import { render } from "../../test-utils";
import fetchMock from "fetch-mock";
import Cita from "./Cita";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom";
import { quoteMoe } from "../../mocks/quotes.mocks";

describe("Prueba en Componente Cita", () => {
  beforeAll(() => {
    fetchMock.mock(
      "https://thesimpsonsquoteapi.glitch.me/quotes?character=moe",
      quoteMoe
    );
  });

  afterAll(() => {
    fetchMock.restore();
  });

  test("Al ingresar un nombre debe aparecer CARGANDO...", () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    fireEvent.change(input, { target: { value: "moe" } });
    const button = screen.getByRole("button", { name: "Obtener Cita" });
    fireEvent.click(button);
    expect(screen.getByText("CARGANDO...")).toBeInTheDocument();
  });

  test("El boton borra la cita del autor que se busca", async () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    fireEvent.change(input, { target: { value: "moe" } });
    const button = screen.getByRole("button", { name: "Obtener Cita" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("CARGANDO...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Moe Szyslak")).toBeInTheDocument();
    });

    const cleanButton = screen.getByRole("button", { name: "Borrar" });
    fireEvent.click(cleanButton);
    expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
  });

  test("Busqueda de cita por personaje", () => {
    render(<Cita />);
    expect(screen.getByText("Obtener cita aleatoria")).toBeInTheDocument();
  });

  test("Busqueda de una cita por personaje", async () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    fireEvent.change(input, { target: { value: "moe" } });
    const button = screen.getByRole("button", { name: "Obtener Cita" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("CARGANDO...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Moe Szyslak")).toBeInTheDocument();
    });
  });
});
