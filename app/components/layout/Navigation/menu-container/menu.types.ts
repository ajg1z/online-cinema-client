import { TypeMaterialIconName } from '@/shared/types/icon.types';

export interface IMenu {
  title: string;
  items: IMenuItem[];
  id: number;
}

export interface IMenuItem {
  icon: TypeMaterialIconName;
  title: string;
  link: string;
}

export interface IMenuProps {
  menu: IMenu;
}
