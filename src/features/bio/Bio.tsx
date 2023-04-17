import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import {
  BioDescripcion,
  BioImagen,
  BioNombre,
  BotonBioActivo,
  BioContenedor,
  ContenedorBotones,
} from "./styles";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const { image, nombre, descripcion, id } = bioActiva;

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BotonBioActivo
        key={nombre as string}
        onClick={() => {
          onClick(nombre as NombresSimpsons);
        }}
        isActive={id === nombre}
      >
        {nombre}
      </BotonBioActivo>
    ));
  };

  return (
    <BioContenedor>
      <ContenedorBotones>{crearBotones()}</ContenedorBotones>
      <BioImagen src={image} alt={nombre} />
      <div>
        <BioNombre>{nombre}</BioNombre>
        <BioDescripcion>{descripcion}</BioDescripcion>
      </div>
    </BioContenedor>
  );
};

export default Bio;
