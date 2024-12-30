> This is a fork of [gatsby-source-google-docs](https://github.com/cedricdelpoux/gatsby-source-google-docs/). All credit goes to the original author.

# gatsby-source-gdocs2md

`gatsby-source-gdocs2md` is a [Gatsby](https://www.gatsbyjs.org/) plugin to transform [Google Docs](https://docs.google.com/) to markdown files.

<p><details><summary>Why use Google Docs to write your content ?</summary>

- 🖋 Best online WYSIWYG editor
- 🖥 Desktop web app
- 📱 Mobile app
- 🛩 Offline redaction
- 🔥 No need for external CMS
- ✅ No more content in your source code

</details></p>

## Features

- **Google Docs** formatting options (headings, bullets, tables, images...)
- `MDX` support to use `<ReactComponents />` in your documents
- **Gatsby** v3 & v2 support
- `gatsby-plugin-image` and `gatsby-image` support
- Code blocs support
- **Gatsby Cloud** support
- Slug generation from **Google Drive** tree
- Crosslinks between pages
- Related content
- Custom metadata to enhance documents

## Installation

Download `gatsby-source-gdocs2md` and `gatsby-transformer-remark` (or `gatsby-plugin-mdx` for [advanced usage](/examples/website))

```shell
yarn add gatsby-source-gdocs2md gatsby-transformer-remark
```

- `gatsby-source-gdocs2md` transform **Google Docs** to **Markdown**
- `gatsby-transformer-remark` transform **Markdown** to **HTML**
- `gatsby-plugin-mdx` transform **Markdown** to **MDX**

## Token generation

To generate gooogle variables in .env file:

- Open a terminal at the root of your project
- Type the following command

```
node utils/googleoauth2-utils/src/generate-token.js
```

## Usage

### Organize your documents

Go to your [Google Drive](https://drive.google.com/drive/), create a folder and put some documents inside it.

```js
↳ 🗂 Root folder
    ↳ 🗂 en `locale: en` `skip: true`
        ↳ 📝 Home
        ↳ 📝 About
        ↳ 🗂 Posts
            ↳ 🗂 Drafts `exclude: true`
                ↳ 📝 Draft 1
            ↳ 📝 My year 2020 `date: 2021-01-01`
            ↳ 📝 Post 2 `slug: /custom/slug`
    ↳ 🗂 fr `locale: fr`
        ↳ 📝 Accueil
```

<p><details><summary>🤡 How to enhance documents with metadata?</summary>

- Fill the document (or folder) `description` field in Google Drive with a `YAML` object

```yaml
locale: fr
template: post
category: Category Name
tags: [tag1, tag2]
slug: /custom-slug
date: 2019-01-01
```

> There are special metadata
>
> - For folders:
>   - `exclude: true`: Exclude the folder and its documents
>   - `skip: true`: Remove the folder from slug but keep its documents
> - For documents:
>   - `index:true`: Use document as the folder index

- Spread metadata into the tree using folders metadata.

> ⬆️ For the tree example above:
>
> - "en" folder will be removed from slug because of `skip: true`

- Exclude folders and documents using `exclude: true`. Perfect to keep drafts documents. One you want to publish a page, just move the document one level up.

> ⬆️ For the tree example above:
>
> - Documents under `Drafts` will be exclude because of `exclude: true`.

- Every metadata will be available in `GoogleDocs` nodes and you can use everywhere in you `Gatsby` site

</details></p>

<p><details><summary>🌄 How to add cover?</summary>

Add an image in your [Google Document first page header](https://support.google.com/docs/answer/86629)

</details></p>

<p><details><summary>🍞 How to add slug and breadcrumb?</summary>

`slug` and `breadcrumb` fields add automatically generated using the folders tree structure and transformed using `kebab-case`.

> ⬆️ For the tree example above:
> The `GoogleDocs` node for document `My year 2020`
>
> ```js
> {
>     path: "/en/posts/my-year-2020" // Original Google Drive path
>     slug: "/posts/my-year-2020" // `en` is out because of `skip: true`
>     breadcrumb: [
>         {name: "Posts", slug: "/posts"},
>         {name: "My year 2020", slug: "/posts/my-year-2020"},
>     ],
>     locale: "fr",
>     date: "2021-01-01" // Fixed date !
> }
> ```
>
> The `GoogleDocs` node for document `Post 2` will have a custom slug
>
> ```js
> {
>     path: "/en/posts/post-2"
>     slug: "/custom/slug"
>     breadcrumb: [
>         {name: "Posts", slug: "/posts"},
>         {name: "Post 2", slug: "/custom/slug"},
>     ],
>     locale: "en",
>     date: "2020-09-12" // Google Drive document creation date
> }
> ```

You also can add metadata (`locale`, `date` ...) to your documents.

</details></p>

### Add the plugin to your `gatsby-config.js` file

| Option           | Required | Type    | Default     | Example        |
| ---------------- | -------- | ------- | ----------- | -------------- |
| folder           | `true`   | String  | `null`      | `"1Tn1dCbIc"`  |
| target           | `false`  | String  | `src/pages` | `"src/gdocs"`  |
| pagecontext      | `false`  | Array   | `[]`        | `["locale"]`   |
| demoteheadings   | `false`  | Boolean | `true`      | `false`        |
| imagesOptions    | `false`  | Object  | `null`      | `{width: 512}` |
| keepdefaultstyle | `false`  | Boolean | `false`     | `true`         |
| skipcodes        | `false`  | Boolean | `false`     | `true`         |
| skipfootnotes    | `false`  | Boolean | `false`     | `true`         |
| skipheadings     | `false`  | Boolean | `false`     | `true`         |
| skipimages       | `false`  | Boolean | `false`     | `true`         |
| skiplists        | `false`  | Boolean | `false`     | `true`         |
| skipquotes       | `false`  | Boolean | `false`     | `true`         |
| skiptables       | `false`  | Boolean | `false`     | `true`         |
| debug            | `false`  | Boolean | `false`     | `true`         |

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-gdocs2md",
      options: {
        // https://drive.google.com/drive/folders/FOLDER_ID
        folder: "FOLDER_ID",
        // defaults to src/pages
        target: "FOLDER_PATH",
      },
    },
    "gatsby-transformer-remark",
    //
    // OR "gatsby-plugin-mdx" for advanced usage using MDX
    //
    // You need some transformations?
    // Checkout https://www.gatsbyjs.com/plugins/?=gatsby-remark
    // And pick-up some plugins
  ],
};
```

<p><details><summary>📷 How to use images ?</summary>

`gatsby-plugin-sharp`, `gatsby-transformer-sharp` and `gatsby-remark-images` are required if you want to take advantage of [gatsby-image blur-up technique](https://using-gatsby-image.gatsbyjs.org/blur-up/).

```shell
yarn add gatsby-plugin-sharp gatsby-transformer-sharp gatsby-remark-images
```

```js
module.exports = {
  plugins: [
    "gatsby-source-gdocs2md",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-images"],
      },
    },
  ],
};
```

</details></p>

<p><details><summary>⚛️ How to use codes blocks ?</summary>

Use [Code Blocks](https://gsuite.google.com/marketplace/app/code_blocks/100740430168) Google Docs extension to format your code blocks.

To specify the lang, you need to add a fist line in your code block following the format `lang:javascript`.

To get Syntax highlighting, I recommend using `prismjs` but it's not mandatory.

```shell
yarn add gatsby-remark-prismjs prismjs
```

Add the `gatsby-remark-prismjs` plugin to your `gatsby-config.js`

```js
module.exports = {
  plugins: [
    "gatsby-source-gdocs2md",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-prismjs"],
      },
    },
  ],
};
```

Import a `prismjs` theme in your `gatsby-browser.js`

```js
require("prismjs/themes/prism.css");
```

</details></p>

### Trigger production builds

- Go to [Google Drive example folder](https://drive.google.com/drive/folders/1YJWX_FRoVusp-51ztedm6HSZqpbJA3ag)
- Create a copy of **Trigger Gatsby Build** file using `Right Click -> Create a copy`
- Open your copy and update the **Build Webhook URL** in `A2`
- Click the **Deploy** button to trigger a new build

> This method works with any hosting services: Gatsby Cloud, Netlify...

