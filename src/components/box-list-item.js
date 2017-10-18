import React from 'react'

const BoxListItem = ({box, onBoxSelect}) => {

  return (
    <li onClick={() => onBoxSelect(box)} className="list-group-item">
      {box.name}
    </li>
  );
}

export default BoxListItem;
