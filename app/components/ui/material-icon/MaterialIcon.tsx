import { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from '@/shared/types/icon.types';

interface IMaterialIconProps {
  name: TypeMaterialIconName;
}

const MaterialIcon: FC<IMaterialIconProps> = ({ name }) => {
  if (!name) return <></>;

  const Component = MaterialIcons[name];

  return Component ? <Component /> : <MaterialIcons.MdError />;
};

export default MaterialIcon;
