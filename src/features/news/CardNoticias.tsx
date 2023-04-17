import { FC } from "react";
import Modal from "../news/ComponenteModal";
import { INoticias, TextoPrimeraLetraMayuscula } from "./fakeRest";
import useToggle from "../../hooks/useToggle";

import {
  BotonLectura,
  TarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  FechaTarjetaNoticia,
  TituloTarjetaNoticia,
} from "./styled";

interface IProps {
  noticias: INoticias;
}

const CardNoticias: FC<IProps> = ({ noticias }) => {
  const { isOpen, toggle } = useToggle();
  const { titulo, descripcion, fecha, imagen } = noticias;
  const tituloMayuscula = TextoPrimeraLetraMayuscula(titulo);
  const descripcionCorta = descripcion.substring(0, 100);

  return (
    <>
      <TarjetaNoticia>
        <ImagenTarjetaNoticia src={imagen} />
        <TituloTarjetaNoticia aria-label="modal-title">
          {tituloMayuscula}
        </TituloTarjetaNoticia>
        <FechaTarjetaNoticia>Hace {fecha} minutos</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia aria-label="description">
          {descripcionCorta}
        </DescripcionTarjetaNoticia>
        <BotonLectura aria-label="read-more" onClick={() => toggle()}>
          Ver más
        </BotonLectura>
      </TarjetaNoticia>
      {isOpen && <Modal noticias={noticias} toggle={toggle} />}
    </>
  );
};

export default CardNoticias;