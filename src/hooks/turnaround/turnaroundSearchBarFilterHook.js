import { useState } from 'react';

import { ENTER_KEY_CODE } from 'src/constants/keyCodeConstant';

export default function turnaroundSearchBarFilterHook(props) {
  const {
    searchBarPicked,
    setSearchBarValueAction,
  } = props;

  const [searchBarValue, setSearchBarValue] = useState(searchBarPicked);

  const handleInputKeyDown = (event) => {
    if (event.key === ENTER_KEY_CODE) {
      setSearchBarValueAction(
        searchBarValue,
      );
    }
  };

  return {
    handleInputKeyDown,
    searchBarValue,
    setSearchBarValue,
  };
}
