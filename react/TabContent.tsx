import React from 'react'
import { defineMessages } from 'react-intl'

import { generateBlockClass, BlockClass } from '@vtex/css-handles'

import styles from './components/TabLayout.css'

const TabContent: StorefrontFunctionComponent<BlockClass> = props => {
  const { blockClass, children } = props

  const baseClassNames = generateBlockClass(styles.contentContainer, blockClass)

  return (
    <div className={`${baseClassNames} w-100`}>
      {children}
    </div>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.tabContent.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.tabContent.description',
  },
})

TabContent.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabContent