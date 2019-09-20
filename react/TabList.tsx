import React from 'react'
import { defineMessages } from 'react-intl'

import { generateBlockClass, BlockClass } from '@vtex/css-handles'

import styles from './components/TabLayout.css'

const TabList: StorefrontFunctionComponent<BlockClass> = props => {
  const { blockClass, children } = props

  const baseClassNames = generateBlockClass(styles.listContainer, blockClass)

  return (
    <div className={`${baseClassNames} flex w-100 flex-wrap justify-center`}>
      {children}
    </div>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.tabList.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.tabList.description',
  },
})

TabList.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabList