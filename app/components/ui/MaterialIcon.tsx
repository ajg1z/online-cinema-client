import { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from '@/shared/types/icon.types';

interface MaterialIconProps {
  name: TypeMaterialIconName;
}

const MaterialIcon: FC<MaterialIconProps> = ({ name }) => {
  const Component = MaterialIcons[name];

  return <Component /> || <MaterialIcons.MdError />;
};

export default MaterialIcon;
