import React from 'react'
import BoxListItem from './box-list-item'

const BoxList = ({boxes, onBoxSelect}) => {
  const boxItems = boxes.map( box => {
    return (
      <BoxListItem
        onBoxSelect={onBoxSelect}
        box={box}
        key={box.id}/>
    )
  })


  return (
    <ul className="col-md-4 list-group">
      {boxItems}
    </ul>
  )
}

export default BoxList
