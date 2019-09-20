import React from 'react'
import { defineMessages } from 'react-intl'

import { generateBlockClass, BlockClass } from '@vtex/css-handles'
import {
  useTabState
} from './components/TabLayoutContext'

import styles from './components/TabLayout.css'

interface Props {
    tabId: string
}

const TabContentItem: StorefrontFunctionComponent<Props & BlockClass> = props => {
  const { blockClass, tabId, children } = props
  const { activeTab } = useTabState()
  const baseClassNames = generateBlockClass(styles.contentItem, blockClass)

  if (activeTab !== tabId) return null
  
  return (
    <div className={`${baseClassNames} w-100`}>
      {children}
    </div>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.tabContentItem.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.tabContentItem.description',
  },
})

TabContentItem.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabContentItem