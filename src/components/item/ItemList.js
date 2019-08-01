import React from 'react'
import { Col } from 'reactstrap'
import Item from './Item'

const ItemList = ({ items, handleItemSelect, kind }) => {
  if (!items) {
    return <div />
  }
  return items.map((item, i) => {
    const props =
      kind === 'youtube'
        ? {
            itemSrc: item.snippet.thumbnails.medium.url,
            itemAlt: item.snippet.description,
            itemTitle: item.snippet.title
          }
        : {
            itemSrc: item.link,
            itemAlt: item.snippet,
            itemTitle: item.title
          }
    return (
      <Col xs={12} sm={6} md={4} lg={3} key={i}>
        <Item item={item} handleItemSelect={handleItemSelect} {...props} />
      </Col>
    )
  })
}
export default ItemList
