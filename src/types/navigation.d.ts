import { ComponentType, Element } from 'react';

interface subcategory {
  categoryId: string;
  path: string;
}

export interface IRoute {
  path: string;
  name: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType;
  icon?: ComponentType | string | Element;
  secondary?: boolean;
  collapse?: boolean;
  items?: IRoute[];
  subcategories?: subcategory[];
  rightElement?: boolean;
  invisible?: boolean;
}
