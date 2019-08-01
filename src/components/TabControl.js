/* eslint react/no-multi-comp:0, no-console:0, no-alert:0, no-undef: 0 */
import 'rc-tabs/assets/index.css'
import React from 'react'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/TabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'

import { Button } from 'reactstrap'
import Page from './Page'

let index = 1

class TabControl extends React.Component {
  defaultDataPerTab = {
    items: [],
    ytOnly: false,
    searchTerm: '',
    startIndex: 1,
    nextPageToken: ''
  }

  state = {
    tabs: [
      {
        title: 'Tab: 1'
      }
    ],
    activeKey: 'Tab: 1',
    dataPerTab: {
      'Tab: 1': this.defaultDataPerTab
    }
  }

  tabElement = title => (
    <>
      {title}
      <a
        href="#?"
        className="removeTab"
        onClick={e => {
          this.remove(title, e)
        }}
      >
        X
      </a>
    </>
  )

  setPageData = pageData => {
    const newDataPerTab = { ...this.state.dataPerTab }
    newDataPerTab[this.state.activeKey] = pageData
    this.setState({
      dataPerTab: newDataPerTab
    })
  }

  onTabChange = activeKey => {
    this.setState({
      activeKey
    })
  }

  construct() {
    return this.state.tabs.map(tab => {
      return <TabPane tab={this.tabElement(tab.title)} key={tab.title} />
    })
  }

  remove = (title, e) => {
    e.stopPropagation()
    if (this.state.tabs.length === 1) {
      alert('Cannot delete last tab')
      return
    }
    let foundIndex = 0
    const after = this.state.tabs.filter((t, i) => {
      if (t.title !== title) {
        return true
      }
      foundIndex = i
      return false
    })
    let activeKey = this.state.activeKey
    if (activeKey === title) {
      if (foundIndex) {
        foundIndex--
      }
      activeKey = after[foundIndex].title
    }
    this.setState({
      tabs: after,
      activeKey
    })
  }

  add = e => {
    e.stopPropagation()
    index++
    const newTab = {
      title: `Tab: ${index}`
    }
    const newDataPerTab = { ...this.state.dataPerTab }
    newDataPerTab[`Tab: ${index}`] = this.defaultDataPerTab
    this.setState({
      tabs: this.state.tabs.concat(newTab),
      dataPerTab: newDataPerTab,
      activeKey: `Tab: ${index}`
    })
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <Tabs
          renderTabBar={() => (
            <ScrollableInkTabBar
              extraContent={
                <Button
                  className="add-new-tab"
                  color="primary"
                  size="sm"
                  onClick={this.add}
                >
                  + add new tab
                </Button>
              }
            />
          )}
          renderTabContent={() => <TabContent></TabContent>}
          activeKey={this.state.activeKey}
          onChange={this.onTabChange}
        >
          {this.construct()}
        </Tabs>
        <Page
          setPageData={this.setPageData}
          pageData={this.state.dataPerTab[this.state.activeKey]}
        />
      </div>
    )
  }
}

export default TabControl
