📢 Use this project, [contribute](https://github.com/vtex-apps/tab-layout) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Tab Layout

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Tab-layout is a layout structuring paradigm built within VTEX IO store framework to allow the construction of custom tabbed layouts. This paradigm uses the concept of a tab list containing tab list items (the tabs) and a tab content area containing tab content items (the content panes that the tabs control) to set the desired structure and visibility of components in a given page.

The `tab-layout` component provides a context for the `tab-list` and `tab-content` components to communicate with each other. A variety of layouts are possible as long as both of those are somewhere within `tab-layout`.

## Blocks API

Since `tab-layout` should be widely used to achieve different layouts, its interface is very permissive:

```json
"tab-layout": {
  "component": "TabLayout",
  "composition": "children",
  "allowed": "*"
},
"tab-list": {
  "component": "TabList",
  "composition": "children",
  "allowed": ["tab-list.item"]
},
"tab-list.item": {
  "component": "TabListItem"
},
"tab-list.item.children": {
  "component": "TabListItemChildren"
},
"tab-content": {
  "component": "TabContent",
  "composition": "children",
  "allowed": "*"
},
"tab-content.item": {
  "component": "TabContentItem",
  "composition": "children",
  "allowed": "*"
}
```

Notice that you could use _any_ array of blocks as `children` of `tab-layout`, given that they are allowed by the `block` that is directly above it. However, `tab-list` and `tab-content` must exist somewhere within `tab-layout` for the tab interface to function.

Only `tab-list.item`s may exist inside `tab-list`, as those represent the actual tabs that users will interact with. Each tab should be given a `tabId` prop with a value that matches the `tabId` of a `tab-content.item` block.

You can also use `tab-list.item.children` which is a flexible alternative to `tab-list.item` which accepts any array of blocks as its children.

Despite apparently allowing any block as its children, `tab-content` must **only** contain an array of `tab-content.item`s as its children.

A `tab-content.item` can contain any array of blocks as its children, given that they are allowed by the parent of `tab-content` (or `tab-layout` as the case may be). Each tab content item should be given a `tabId` prop with a value that matches the `tabId` of a `tab-list.item` block.

### Configuration

This props should be edited at your theme's `blocks.json`:

#### tab-layout

| Prop name                  | Type                  | Description                                                                                                   | Default value |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `defaultActiveTabId`             | `String` | Set the id of the tab to be used as default tab. Should match with the value `tabId` of a `tab-list.item`. If not provided, first tab will be used as default.  | `""`   |
| `blockClass`               | `String`              | Unique class name to be appended to block container class                                                     | `""`          |

#### tab-list

| Prop name                  | Type                  | Description                                                                                                   | Default value |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`               | `String`              | Unique class name to be appended to block container class                                                     | `""`          |

#### tab-list.item

| Prop name                | Type                 | Description                                                                                                                | Default value |
| ------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`             | `String`             | Unique class name to be appended to block container class                                                                  | `""`          |
| `tabId`                 | `String`              | A `string` used to match the tab to its content item               | `undefined`   |
| `label`             | `String` | A `string` that determines the tab's text label | `undefined`   |

#### tab-list.item.children

| `blockClass`             | `String`             | Unique class name to be appended to block container class                                                                  | `""`          |
| `tabId`                 | `String`              | A `string` used to match the tab to its content item               | `undefined`   |


#### tab-content

| Prop name                  | Type                  | Description                                                                                                   | Default value |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`               | `String`              | Unique class name to be appended to block container class                                                     | `""`          |

#### tab-content.item

| Prop name                | Type                 | Description                                                                                                                | Default value |
| ------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`             | `String`             | Unique class name to be appended to block container class                                                                  | `""`          |
| `tabId`                 | `String`              | A `string` used to match the content item to its tab               | `undefined`   |

### Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handle |
| ---------- |
| `container`  |
| `listContainer`  |
| `listItem`  |
| `listItemActive`  |
| `listItemChildren` |
| `listItemChildrenActive` |
| `contentContainer`  |
| `contentItem`  |

## Rules and recommendations

- Ensure that only **one** `tab-list.item` is given a `defaultActiveTab` prop of `true`.
- Ensure that the `tabId` of each `tab-list.item`/`tab-content.item` pair matches exactly.

## Example usage

The following creates a `tab-layout` with two tabs labeled "Home 1" and "Home 2":

```json
"store.home": {
    "blocks": [
      "tab-layout#home"
    ]
  },
  "tab-layout#home": {
    "children": [
      "tab-list#home",
      "tab-content#home"
    ],
    "props": {
      "blockClass": "home",
      "defaultActiveTabId": "home1"
    }
  },
  "tab-list#home": {
    "children": [
      "tab-list.item#home1",
      "tab-list.item#home2"
      ]
  },
  "tab-list.item#home1": {
    "props": {
      "tabId": "home1",
      "label": "Home 1",
      "defaultActiveTab": true
    }
  },
  "tab-list.item#home2": {
    "props": {
      "tabId": "home2",
      "label": "Home 2"
    }
  },
  "tab-content#home": {
    "children": [
      "tab-content.item#home1",
      "tab-content.item#home2"
    ]
  },
  "tab-content.item#home1": {
    "children": [
      "carousel#home"
    ],
    "props": {
      "tabId": "home1"
    }
  },
  "tab-content.item#home2": {
    "children": [
      "shelf#home",
      "info-card#home",
      "rich-text#question",
      "rich-text#link",
      "newsletter"
    ],
    "props": {
      "tabId": "home2"
    }
  }
```

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/JNussens"><img src="https://avatars0.githubusercontent.com/u/7662734?v=4" width="100px;" alt=""/><br /><sub><b>Jean Nussenzveig</b></sub></a><br /><a href="https://github.com/vtex-apps/tab-layout/commits?author=JNussens" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lucasayb"><img src="https://avatars2.githubusercontent.com/u/17356081?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Yamamoto</b></sub></a><br /><a href="https://github.com/vtex-apps/tab-layout/commits?author=lucasayb" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
