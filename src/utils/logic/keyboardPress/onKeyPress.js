import { ENTER_KEY_CODE } from 'src/constants/keyCodeConstant';

export function onEnterKeyPress(keyPressed, actionToLaunch) { // eslint-disable-line
  if (keyPressed === ENTER_KEY_CODE) {
    actionToLaunch();
  }
}
