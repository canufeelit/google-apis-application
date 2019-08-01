import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput
} from 'reactstrap'

const Searchbar = props => {
  const handleSearchFieldChange = event => {
    props.setSearchTerm(event.target.value)
  }

  const handleSearchTypeChange = event => {
    props.setytOnly(event.target.checked)
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.handleFormSubmit()
  }

  return (
    <div className="search-bar ui segment">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="google-search text-primary text-center">
          <Label for="google-search">
            <h2>YouTube API and Google Custom Search Engine API</h2>
          </Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
            <Input
              onChange={handleSearchFieldChange}
              value={props.searchTerm}
              id="google-search"
              name="google-search"
              type="text"
              placeholder="..."
            />
            <InputGroupAddon addonType="append">
              <Button color="primary">Submit</Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup className="type-search">
          <div>
            <CustomInput
              type="switch"
              id="youtube-search"
              name="youtube-search"
              label={props.ytOnly ? 'Youtube search' : 'Google search'}
              onChange={handleSearchTypeChange}
              checked={props.ytOnly}
            />
          </div>
        </FormGroup>
      </Form>
    </div>
  )
}

Searchbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  ytOnly: PropTypes.bool,
  setytOnly: PropTypes.func
}

export default Searchbar
