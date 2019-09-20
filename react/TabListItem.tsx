import React from 'react'
import { defineMessages } from 'react-intl'

import { Button } from 'vtex.styleguide'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import {
  useTabState,
  useTabDispatch
} from './components/TabLayoutContext'

import styles from './components/TabLayout.css'

interface Props {
    tabId: string
    label: string
    defaultActiveTab: boolean
}

const TabListItem: StorefrontFunctionComponent<Props & BlockClass> = props => {
  const { blockClass, tabId, label, defaultActiveTab = false } = props
  const { activeTab } = useTabState()
  const dispatch = useTabDispatch()
  const baseClassNames = generateBlockClass(styles.listItem, blockClass)

  if (defaultActiveTab && activeTab === "") dispatch({
    type: 'changeActiveTab',
        payload: { newActiveTab: tabId }
  })

  return (
    <div className={`${baseClassNames} ph2 pv2 ma2`}>
      <Button variation={activeTab === tabId ? "primary" : "tertiary"} 
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