import { FC } from "react";
import { useAppSelector } from "../../app/hooks";

import {
  TarjetaModal,
  ContenedorModal,
  CotenedorTexto,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  CloseButton,
} from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INoticias } from "./fakeRest";
import BotonSuscripcion from "./BotonSuscribir";

interface IProps {
  noticias: INoticias;
  toggle: () => void;
}

const Modal: FC<IProps> = ({ noticias, toggle }) => {
  const { suscripIdList } = useAppSelector((state) => state.noticias);

  const esPremium = suscripIdList.some((id) => id === noticias.id);

  const modalData = {
    title: "Suscríbete",
    image: SuscribeImage,
    description:
      "Una suscripción a te brindará acceso a contenido adicional, acceso anticipado a nuevas actualizaciones, descuentos exclusivos, regalos y bonificaciones especiales, y un soporte exclusivo para mejorar tu experiencia de juego. ¡Disfruta de una experiencia de juego más completa y emocionante con una suscripción.",
  };

  const { titulo, imagen, descripcion } = noticias;

  const src = esPremium ? imagen : modalData.image;
  const alt = esPremium ? "news-image" : "mr-burns-excelent";
  const title = esPremium ? titulo : modalData.title;
  const description = esPremium ? descripcion : modalData.description;

  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton aria-label="close-modal" onClick={toggle}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={src} alt={alt} />
        <CotenedorTexto>
          <TituloModal>{title}</TituloModal>
          <DescripcionModal>{description}</DescripcionModal>
          <BotonSuscripcion noticias={noticias} />
        </CotenedorTexto>
      </TarjetaModal>
    </ContenedorModal>
  );
};

export default Modal;