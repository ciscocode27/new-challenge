export interface Product {
    id:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  Date;
    date_revision: Date;
    altLogo?:      string;
    openMenu?:      boolean;
}

export enum TipoAccion {
    Create = 'CREATE',
    Update = 'Update'
  }

export interface eventoForm{
    typeForm:    TipoAccion;
}

export interface Message{
    title:  string;
    code:   number;
}