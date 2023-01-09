import { useEffect, useState } from 'react';

export function useRenderClient() {
  const [isRenderClient, setIsRenderClient] = useState(false);

  useEffect(() => {
    !isRenderClient && setIsRenderClient(true);
  }, [isRenderClient]);

  return { isRenderClient };
}
