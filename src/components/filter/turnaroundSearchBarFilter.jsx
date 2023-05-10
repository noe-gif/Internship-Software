import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from 'src/components/styleSearchBarFilter';

import turnaroundSearchBarFilterHook from 'src/hooks/turnaround/turnaroundSearchBarFilterHook';

import { PLACEHOLDER_VALUE } from 'src/constants/turnaround/turnaroundSearchBarFilter';

export default function TurnaroundSearchBarFilter(props) {
  const {
    handleInputKeyDown,
    setSearchBarValue,
  } = turnaroundSearchBarFilterHook(props);

  return (
    <Search id="TurnaroundSearchBarFilter">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={PLACEHOLDER_VALUE}
        onKeyDown={handleInputKeyDown}
        onChange={(event) => setSearchBarValue(event.target.value)}
      />
    </Search>
  );
}
