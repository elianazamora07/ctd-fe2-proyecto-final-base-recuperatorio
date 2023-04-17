import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../app/store";
import { obtenerNoticias } from "./fakeRest";
import { INoticias } from "./fakeRest";

export interface NoticiasState {
  nuevaLista: INoticias[] | null;
  suscripIdList: number[];
}

const initialState: NoticiasState = {
  nuevaLista: null,
  suscripIdList: [],
};

export const getNuevaListaAsync = createAsyncThunk("getNoticias", async () => {
  const nuevaLista = await obtenerNoticias();
  return nuevaLista;
});

const nuevaLista = createSlice({
  name: "noticias",
  initialState,
  reducers: {
    añadirSubscripcion: (state, action: PayloadAction<number>) => {
      state.suscripIdList = [...state.suscripIdList, action.payload];
    },
    limpiarLista: (state) => {
      state.suscripIdList = initialState.suscripIdList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNuevaListaAsync.fulfilled, (state, action) => {
      const list: number[] = action.payload
        .filter((noticias) => noticias.esPremium)
        .map((noticias) => noticias.id);
      state.nuevaLista = action.payload;
      state.suscripIdList = list;
    });
  },
});

export const getNuevaLista = () => (dispatch: AppDispatch) => {
  return dispatch(getNuevaListaAsync());
};

export const { añadirSubscripcion, limpiarLista } = nuevaLista.actions;

export default nuevaLista.reducer;