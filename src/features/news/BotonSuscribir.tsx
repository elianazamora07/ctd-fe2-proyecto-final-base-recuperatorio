import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { añadirSubscripcion } from "./noticiaSlice";
import { INoticias } from "./fakeRest";
import { BotonSuscribir } from "./styled";

const BotonSuscripcion: FC<{ noticias: INoticias }> = ({ noticias }) => {
  const dispatch = useAppDispatch();
  const { suscripIdList } = useAppSelector(({ noticias }) => noticias);

  const onClickSubscribe = () => {
    dispatch(añadirSubscripcion(noticias.id));
    setTimeout(() => {
      alert("Felicitaciones, te has suscrito con exito");
    }, 1000);
  };

  return (
    <>
      {!suscripIdList.some((id) => id === noticias.id) && (
        <BotonSuscribir aria-label="suscribe-button" onClick={onClickSubscribe}>
          Suscríbete
        </BotonSuscribir>
      )}
    </>
  );
};

export default BotonSuscripcion;
