import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NewsCard from "./CardNoticias";
import { getNuevaLista } from "./noticiaSlice";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";

const Noticias = () => {
  const dispatch = useAppDispatch();
  const { nuevaLista } = useAppSelector((state) => state.noticias);

  useEffect(() => {
    dispatch(getNuevaLista());
  }, [dispatch]);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {nuevaLista?.map((noticias) => (
          <NewsCard key={`key_notice_${noticias.id}`} noticias={noticias} />
        ))}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
