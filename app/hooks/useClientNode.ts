import { useCallback, useState } from 'react';

function useClientNode(): [HTMLElement | null, (node: HTMLElement) => void] {
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  return [node, ref];
}

export default useClientNode;
