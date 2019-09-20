import React from 'react'
import { defineMessages } from 'react-intl'

import {
  TabLayoutContextProvider
} from './components/TabLayoutContext'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'

import styles from './components/TabLayout.css'

const TabLayout: StorefrontFunctionComponent<BlockClass> = props => {
  const { blockClass, children } = props

  const baseClassNames = generateBlockClass(styles.container, blockClass)

  return (
    <TabLayoutContextProvider activeTab={""}>
        <div className={baseClassNames}>
            {children}
        </div>
    </TabLayoutContextProvider>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.tabLayout.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.tabLayout.description',
  },
})

TabLayout.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default TabLayout