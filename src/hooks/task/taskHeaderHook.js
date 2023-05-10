import { TURNAROUNDS_DETAILS_COMPONENT_SIZE_SMALL } from 'src/constants/turnaroundDetail/turnaroundsDetails';

export default function taskHeaderHook(componentSize) {
  const isComponentSizeSmall = () => (componentSize === TURNAROUNDS_DETAILS_COMPONENT_SIZE_SMALL);

  return {
    isComponentSizeSmall,
  };
}
