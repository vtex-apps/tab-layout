import React, { useEffect } from 'react'
import { defineMessages } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import {
  useTabState,
  useTabDispatch
} from './components/TabLayoutContext'

const CSS_HANDLES = ['listItem']

interface Props {
  tabId: string
  label: string
  defaultActiveTab: boolean //deprecated
  position: number
}

const TabListItem: StorefrontFunctionComponent<Props> = props => {
  const { tabId, label, defaultActiveTab, position } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { activeTab } = useTabState()
  const dispatch = useTabDispatch()

  useEffect(() => {
    // defaultActiveTab has been deprecated, keep this for compatibility
    if (defaultActiveTab && activeTab === "") {
      dispatch({
        type: 'changeActiveTab',
        payload: { newActiveTab: tabId }
      })
    }
  }, [])

  const isActive = activeTab === tabId || (!activeTab && position === 0)

  return (
    <div className={`${handles.listItem} ph2 pv2 ma2`}>
      <Button variation={isActive ? "primary" : "tertiary"}
        onClick={() => dispatch({
          type: 'changeActiveTab',
          payload: { newActiveTab: tabId }
        })}>
        {label}
      </Button>
    </div>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.tabListItem.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.tabListItem.description',
  },
})

TabListItem.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabListItem