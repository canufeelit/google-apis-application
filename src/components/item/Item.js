import React from 'react'
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap'

const Item = ({ item, handleItemSelect, itemSrc, itemAlt, itemTitle }) => {
  return (
    <Card onClick={e => handleItemSelect(e, item)} className="item">
      <CardImg className="thumb" top width="100%" src={itemSrc} alt={itemAlt} />
      <CardBody>
        <CardTitle dangerouslySetInnerHTML={{ __html: itemTitle }} />
      </CardBody>
    </Card>
  )
}
export default Item
