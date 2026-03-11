export interface SimpleSection {
  title: string;
  text: string;
}

export interface ListSection {
  title: string;
  items: string[];
}

export interface IdentificacionSection {
  title: string;
  empresa: string;
  cifLabel: string;
  cif: string;
  direccionLabel: string;
  direccion: string;
  emailLabel: string;
  email: string;
  telefonoLabel: string;
  telefono: string;
  registro: string;
}

export interface AvisoLegal {
  title: string;
  sections: {
    identificacion: IdentificacionSection;
    objeto: SimpleSection;
    propiedadIntelectual: SimpleSection;
    responsabilidad: SimpleSection;
  };
}

export interface Privacidad {
  title: string;
  sections: {
    responsable: SimpleSection;
    finalidad: ListSection;
    legitimacion: SimpleSection;
    destinatarios: SimpleSection;
    derechos: SimpleSection;
    conservacion: SimpleSection;
  };
}

export interface LegalData {
  avisoLegal: AvisoLegal;
  privacidad: Privacidad;
}

export interface CookiesSection {
  title: string;
  text?: string;
  items?: string[];
}

export interface CookiesPolicy {
  title: string;
  intro: string;
  sections: {
    queSon: CookiesSection;
    tipos: CookiesSection;
    gestion: CookiesSection;
  };
}