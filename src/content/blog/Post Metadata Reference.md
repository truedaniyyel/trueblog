---
title: 'Post Metadata Reference'
pubDatetime: 2025-03-10
description: 'A simple example of a post metadata.'
---

## Basic Fields

You can find frontmatter structure in `src/content.config.ts`

| Field        | Required | Type                   | Example / Default                                          | Description                                              |
| ------------ | :------: | ---------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| title        |    ✅    | string                 | "My Blog Post"                                             | 1-100 characters                                         |
| pubDatetime  |    ✅    | date (z.coerce.date()) | "2025-03-04T16:06:19Z"<br>1709571979000<br>"March 4, 2025" | Can accept ISO 8601, timestamps, or natural date formats |
| description  |    ✅    | string                 | "Description of my post"                                   | 1-320 characters                                         |
| draft        |    ❌    | boolean                | false                                                      | If true, post won't be published                         |
| author       |    ❌    | string                 | "truedaniyyel"                                             | Defaults to SITE.AUTHOR                                  |
| modDatetime  |    ❌    | date (z.coerce.date()) | "2025-03-04T16:06:19Z"                                     | Optional modification date                               |
| image        |    ❌    | image / string         | "./images/post.png"                                        | Min size 1200×630px if provided                          |
| demoUrl      |    ❌    | string (URL)           | "https://demo.example.com"                                 | Must be a valid URL                                      |
| repoUrl      |    ❌    | string (URL)           | "https://github.com/user/repo"                             | Must be a valid URL                                      |
| canonicalURL |    ❌    | string (URL)           | "https://blog.example.com/post"                            | Must be a valid URL                                      |
| editPost     |    ❌    | object                 | See below                                                  | Post editing configuration                               |

## editPost Object Properties

| Property       | Required | Type    | Example / Default                        | Description                  |
| -------------- | :------: | ------- | ---------------------------------------- | ---------------------------- |
| disabled       |    ❌    | boolean | false                                    | Disable the edit button      |
| url            |    ❌    | string  | "https://github.com/user/repo/edit/main" | Edit URL                     |
| text           |    ❌    | string  | "Edit this post"                         | Edit button text             |
| appendFilePath |    ❌    | boolean | true                                     | Append file path to edit URL |

## Quick Copy Template

```yaml
---
title: ''
pubDatetime: 2025-03-04
description: ''
draft: false
author: 'truedaniyyel'
# modDatetime: 2025-03-04
# image: "./images/post.png"
# demoUrl: ""
# repoUrl: ""
# canonicalURL: ""
# editPost:
#   url: ""
#   text: "Edit this post"
#   appendFilePath: true
---
```
