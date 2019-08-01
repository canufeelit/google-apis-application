import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

import SearchBar from './Searchbar'
import googleSearch from '../api/googleSearch'
import youtubeSearch from '../api/youtubeSearch'
import ItemList from './item/ItemList'
import ModalPopup from './Modal'

class Page extends React.Component {
  state = {
    selectedItem: null,
    modal: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      this.fetchMore()
    }
  }

  fetchMore = async () => {
    let responseData = {}
    try {
      responseData = this.props.pageData.ytOnly
        ? await youtubeSearch(
            this.props.pageData.searchTerm,
            this.props.pageData.nextPageToken
          )
        : await googleSearch(
            this.props.pageData.searchTerm,
            this.props.pageData.startIndex
          )
    } catch (error) {
      // If there is an error we can
      // optionally provide an error page
      console.log(error)
    }

    this.props.setPageData({
      ...this.props.pageData,
      items: responseData.items
        ? this.props.pageData.items.concat(responseData.items)
        : [],
      startIndex: responseData.queries
        ? responseData.queries.nextPage[0].startIndex
        : 1,
      nextPageToken: responseData.nextPageToken
        ? responseData.nextPageToken
        : ''
    })
  }

  handleSubmit = async () => {
    // Return if no search term
    if (!this.props.pageData.searchTerm) {
      return
    }
    this.props.setPageData({
      ...this.props.pageData,
      items: []
    })
    this.fetchMore()
  }

  handleItemSelect = (e, item) => {
    this.setState(prevState => ({
      selectedItem: item,
      modal: true
    }))
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  setytOnly = ytOnly =>
    this.props.setPageData({
      ...this.props.pageData,
      ytOnly,
      items: []
    })

  setSearchTerm = searchTerm =>
    this.props.setPageData({ ...this.props.pageData, searchTerm })

  render() {
    // Additional loading if window height
    // is greater than the initial page content
    // Eg: Bigger screens / Desktop
    if (
      this.props.pageData.items &&
      this.props.pageData.items.length > 0 &&
      document.documentElement.offsetHeight <
        window.innerHeight + document.documentElement.scrollTop
    ) {
      this.fetchMore()
    }
    return (
      <Container>
        <Row>
          <Col>
            <SearchBar
              searchTerm={this.props.pageData.searchTerm}
              setSearchTerm={this.setSearchTerm}
              handleFormSubmit={this.handleSubmit}
              ytOnly={this.props.pageData.ytOnly}
              setytOnly={this.setytOnly}
            />
          </Col>
        </Row>
        <Row>
          <ItemList
            handleItemSelect={this.handleItemSelect}
            items={this.props.pageData.items}
            kind={
              this.props.pageData.items &&
              this.props.pageData.items[0] &&
              this.props.pageData.items[0].kind !== 'customsearch#result'
                ? 'youtube'
                : 'google'
            }
          />
        </Row>
        <ModalPopup
          item={this.state.selectedItem}
          kind={
            this.props.pageData.items &&
            this.props.pageData.items[0] &&
            this.props.pageData.items[0].kind !== 'customsearch#result'
              ? 'youtube'
              : 'google'
          }
          isOpen={this.state.modal}
          toggle={this.toggleModal}
        />
      </Container>
    )
  }
}

Page.propTypes = {
  pageData: PropTypes.object,
  setPageData: PropTypes.func
}

export default Page
