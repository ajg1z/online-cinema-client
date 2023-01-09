import { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from '@/shared/types/icon.types';

import { useRenderClient } from '@/hooks/useRenderClient';

interface IMaterialIconProps {
  name: TypeMaterialIconName;
}

const MaterialIcon: FC<IMaterialIconProps> = ({ name }) => {
  const { isRenderClient } = useRenderClient();

  const Component = MaterialIcons[name];

  if (isRenderClient)
    return Component ? <Component /> : <MaterialIcons.MdError />;

  return null;
};

export default MaterialIcon;
