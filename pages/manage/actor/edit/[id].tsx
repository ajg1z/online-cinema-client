import { NextPageAuth } from '@/shared/types/auth.types';

import ActorEdit from '@/components/screens/admin/actor/ActorEdit';

const ActorEditPage: NextPageAuth = () => {
  return <ActorEdit />;
};

ActorEditPage.isOnlyAdmin = true;

export default ActorEditPage;
