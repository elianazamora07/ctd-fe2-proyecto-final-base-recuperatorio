import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { ESTADO_FETCH } from "./constants";
import { obtenerCita } from "./citaAPI";
import { ICita } from "./types";

/*
Aquí se puede identificar el principio SOLID de responsabilidad única ya que se hace
la implementación de Redux para manejar el estado. Las responsabilidades de configuración de store, 
creación de acciones, reducers y manejo del estado están separadas en archivos distintos, 
lo cual sigue el principio al tener una única responsabilidad para cada función.
*/

export interface EstadoCita {
  data: ICita | null;
  estado: ESTADO_FETCH;
}

const initialState: EstadoCita = {
  data: null,
  estado: ESTADO_FETCH.INACTIVO,
};

export const obtenerCitaAsync = createAsyncThunk(
  "cita/obtenerCita",
  async (personaje: string) => {
    try {
      const cita = await obtenerCita(personaje);
      return cita;
    } catch (err) {
      throw err;
    }
  }
);

export const citaSlice = createSlice({
  name: "citas",
  initialState,
  reducers: {
    limpiar: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(obtenerCitaAsync.pending, (state) => {
        state.estado = ESTADO_FETCH.CARGANDO;
      })
      .addCase(obtenerCitaAsync.fulfilled, (state, action) => {
        state.estado = ESTADO_FETCH.INACTIVO;
        state.data = action.payload;
      })
      .addCase(obtenerCitaAsync.rejected, (state) => {
        state.estado = ESTADO_FETCH.ERROR;
      });
  },
});

export const { limpiar } = citaSlice.actions;

export const obtenerCitaDeLaAPI =
  (personaje: string) => (dispatch: AppDispatch) => {
    dispatch(limpiar());
    dispatch(obtenerCitaAsync(personaje));
  };

export const obtenerCitaDelEstado = (state: RootState) => state?.cita?.data;
export const obtenerEstadoDelPedido = (state: RootState) => state?.cita.estado;

export default citaSlice.reducer;
