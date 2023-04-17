import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import noticiasReducer from "../features/news/noticiaSlice";
import citaReducer from "../features/quote/citaSlice";

export const store = configureStore({
  reducer: {
    cita: citaReducer,
    noticias: noticiasReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
