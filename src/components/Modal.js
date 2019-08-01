/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalPopup = ({ item, isOpen, toggle, kind, className }) => {
  let props = {}
  if (item && item.kind === 'youtube#searchResult') {
    props = {
      itemSrc: `https://www.youtube.com/embed/${item.id.videoId}`,
      itemAlt: item.snippet.description,
      itemTitle: item.snippet.title
    }
  } else {
    props = {
      itemSrc: item && item.link,
      itemAlt: item && item.snippet,
      itemTitle: item && item.title
    }
  }
  return (
    <div>
      <Modal
        centered
        scrollable
        size="xl"
        isOpen={isOpen}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>{props.itemTitle}</ModalHeader>
        <ModalBody>
          {kind === 'youtube' ? (
            <div className="embed">
              <iframe
                src={props.itemSrc}
                allowFullScreen
                title="Video player"
              />
            </div>
          ) : (
            <img src={props.itemSrc} alt={props.itemAlt} />
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalPopup
