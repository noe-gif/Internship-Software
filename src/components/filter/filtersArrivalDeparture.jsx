import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateArrivalAction, updateDepartureAction } from '../../actions/turnaroundActions';

function CheckboxArrivalDeparture(props) {
  const [isChecked, setIsChecked] = useState(true);
  const [filterClassName, setFilterClassName] = useState('isOn');

  const {
    label, name, updateArrivalAction: updateArrivalProps, updateDepartureAction: updateDepartureProps,
  } = props;

  const handleChange = async () => {
    if (name === 'arrival') {
      updateArrivalProps(!isChecked);
    } else if (name === 'departure') {
      updateDepartureProps(!isChecked);
    }

    setIsChecked(!isChecked);
    filterClassName === 'isOn' ? setFilterClassName('isOff') : setFilterClassName('isOn');//eslint-disable-line
  };

  return (
    <div className="arrivalDepartureFilterContainer">
      <div
        className={`arrivalDepartureFilterBubble fontSizeBigBold ${filterClassName}`}
        onClick={handleChange}
        role="button"
        aria-hidden="true"
      >
        <p className={`arrivalDepartureFilterText ${filterClassName}`}>{label}</p>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateArrivalAction, updateDepartureAction }, dispatch);

export default connect(null, mapDispatchToProps)(CheckboxArrivalDeparture);
