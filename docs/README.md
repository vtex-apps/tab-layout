# VTEX Tab Layout

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

#### tab-content

| Prop name                  | Type                  | Description                                                                                                   | Default value |
| -------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`               | `String`              | Unique class name to be appended to block container class                                                     | `""`          |

#### tab-content.item

| Prop name                | Type                 | Description                                                                                                                | Default value |
| ------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`             | `String`             | Unique class name to be appended to block container class                                                                  | `""`          |
| `tabId`                 | `String`              | A `string` used to match the content item to its tab               | `undefined`   |

## Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
"builders": {
  "styles": "1.x"
}
```

2. Create a file called `vtex.tab-layout.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

### Customization

Below, we describe the namespaces that are defined by `tab-layout`.

| CSS Handle | Description                |
| ---------- | -------------------------- |
| `container`  | The container of the entire tabbed layout.    |
| `listContainer`  | The container of the list of tabs. |
| `listItem`  | The container of an individual tab. |
| `contentContainer`  | The container of the tab content items. |
| `contentItem`  | The container of an individual content item. |



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