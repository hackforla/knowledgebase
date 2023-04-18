const _get = require("lodash/get");
const _repeat = require("lodash/repeat");
const _merge = require("lodash/merge");
const path = require("path");

const json2md = require("./json2md-extended");
const { isCodeBlocks, isQuote } = require("./google-document-types");
const { DEFAULT_OPTIONS } = require("./constants");
const { getFrontMatter } = require("./utils.js");
const { normalizeElement } = require("./normalize-element");
const { downloadImageFromURL } = require("./download-image");
const HORIZONTAL_TAB_CHAR = "\x09";
const GOOGLE_DOCS_INDENT = 18;

class GdocObj {
  private _properties: any;
  private _content: any;
  private _elements: any[];
  private _id: string;
  private _cover: any;
  private _footnotes: any;
  private headings: any;
  private related: any;
  private bodyFontSize: any;

  constructor({ id, properties, content, elements }: any = {}) {
    this._id = id;
    this._properties = properties;
    this._content = content;
    this._elements = elements || [];
    this._cover = null;
  }

  get id() {
    return this._id;
  }
  get cover() {
    return this._cover;
  }
  set cover(cover: any) {
    this._cover = cover;
  }

  get footnotes() {
    return this._footnotes;
  }
  set footnotes(footnotes: any) {
    this._footnotes = footnotes;
  }

  get properties() {
    return this._properties;
  }
  set properties(properties: any) {
    this._properties = properties;
  }
  get content() {
    return this._content;
  }
  set content(content: any) {
    this._content = content;
  }
  get elements() {
    return this._elements;
  }

  set elements(elements: any) {
    this._elements = elements;
  }

  formatText(
    el: {
      inlineObjectElement: {
        inlineObjectId: any;
        textStyle: { link: { url: any } };
      };
      textRun: { content: string; textStyle: any };
    },
    { inlineImages = false, namedStyleType = "NORMAL_TEXT" } = {},
    options: any = {}
  ) {
    if (el.inlineObjectElement) {
      const image = this.getImage(el, options) as any;
      if (image) {
        image.alt = image.alt || image.title || "img";
        const relativeFilename = path.join(
          `${this.properties.path ? this.properties.path : "index"}-${
            el.inlineObjectElement.inlineObjectId
          }-gdoc.png`
        );
        const relativeTargetUrl = `${this.properties.slug}-${el.inlineObjectElement.inlineObjectId}-gdoc.png`;
        const filename = path.join(
          options.imagesTarget || options.markdownDir,
          relativeTargetUrl
        );
        // todo: change to have separate var for slug path and slug
        image.targetSource = path.join("/assets/images", relativeTargetUrl);
        // console.log("Downloading image", filename);
        downloadImageFromURL(
          image.source,
          filename
          // el.inlineObjectElement.inlineObjectId
        );
        // if (inlineImages) {
        let html = `<img src="${image.targetSource}" title="${image.title}" alt="${image.alt}" height="${image.height}" width="${image.width}">`;
        if (el.inlineObjectElement.textStyle.link) {
          html = `<a href="${el.inlineObjectElement.textStyle.link.url}">${html}</a>`;
        }
        return html;
        // }
        // this.elements.push({
        //   type: "imgextension",
        //   value: image,
        // });
      }
    }

    if (!el.textRun || !el.textRun.content || !el.textRun.content.trim()) {
      return "";
    }

    let text = el.textRun.content
      .replace(/\n$/, "") // Remove new lines
      .replace(/“|”/g, '"'); // Replace smart quotes by double quotes
    const contentMatch = text.match(/^(\s*)(\S+(?:[ \t\v]*\S+)*)(\s*)$/) as any; // Match "text", "before" and "after"
    const before = contentMatch[1];
    const after = contentMatch[3];
    text = contentMatch[2];

    const defaultStyle = this.getTextStyle(namedStyleType);
    const textStyle = el.textRun.textStyle;
    const style = options.keepDefaultStyle
      ? _merge({}, defaultStyle, textStyle)
      : textStyle;

    const {
      backgroundColor,
      baselineOffset,
      bold,
      fontSize,
      foregroundColor,
      italic,
      link,
      strikethrough,
      underline,
      weightedFontFamily: { fontFamily } = { fontFamily: "" },
    } = style;

    const isInlineCode = fontFamily === "Consolas";
    if (isInlineCode) {
      if (options.skipCodes) return text;

      return "`" + text + "`";
    }

    const styles = [];

    text = text.replace(/\*/g, "\\*"); // Prevent * to be bold
    text = text.replace(/_/g, "\\_"); // Prevent _ to be italic

    if (baselineOffset === "SUPERSCRIPT") {
      text = `<sup>${text}</sup>`;
    }

    if (baselineOffset === "SUBSCRIPT") {
      text = `<sub>${text}</sub>`;
    }

    if (underline && !link) {
      text = `<ins>${text}</ins>`;
    }

    if (italic) {
      text = `_${text}_`;
    }

    if (bold) {
      text = `**${text}**`;
    }

    if (strikethrough) {
      text = `~~${text}~~`;
    }

    if (fontSize) {
      const em = (fontSize.magnitude / this.bodyFontSize).toFixed(2);
      if (em !== "1.00") {
        styles.push(`font-size:${em}em`);
      }
    }

    if (_get(foregroundColor, ["color", "rgbColor"]) && !link) {
      const { rgbColor } = foregroundColor.color;
      const red = Math.round((rgbColor.red || 0) * 255);
      const green = Math.round((rgbColor.green || 0) * 255);
      const blue = Math.round((rgbColor.blue || 0) * 255);
      if (red !== 0 || green !== 0 || blue !== 0) {
        styles.push(`color:rgb(${red}, ${green}, ${blue})`);
      }
    }

    if (_get(backgroundColor, ["color", "rgbColor"]) && !link) {
      const { rgbColor } = backgroundColor.color;
      const red = Math.round((rgbColor.red || 0) * 255);
      const green = Math.round((rgbColor.green || 0) * 255);
      const blue = Math.round((rgbColor.blue || 0) * 255);
      styles.push(`background-color:rgb(${red}, ${green}, ${blue})`);
    }

    if (styles.length > 0 && !options.skipStyles) {
      text = `<span style='${styles.join(";")}'>${text}</span>`;
    }

    if (link) {
      return `${before}[${text}](${link.url})${after}`;
    }

    return before + text + after;
  }

  jekyllifyFrontMatter = async (dataJson: any, options: any = {}) => {
    // let { frontMatter: existingFrontMatter, markdownBody } =
    //   getExistingFrontMatter(markdown);

    const defaultData = {
      title: this.content.title,
      description: this.content.description || "",
      "short-description": "",
      "card-type": "guide-page",
      status: "active",
      display: "true",
      phase: "dev",
      // todo: change below to be dynamic
      svg: "svg/2FA.svg",
      "provider-link": this.properties.slug + options.suffix,
    };
    let frontMatter = "";
    // todo: change below to be dynamic

    console.log("dataJson", dataJson);
    const messageStart =
      Object.keys(dataJson).length === 0 ? "No data" : "Data";
    console.log(`${messageStart} found for ${this.content.title}`);
    // // todo: not connected, replicate and handle [index] error, table error
    // console.log(
    //   "*** Error ***",
    //   error.stack?.substring(0, 150) || error.message || error
    // );
    // }
    const json = { ...defaultData, ...dataJson };
    for (const key in json) {
      frontMatter += `${key}: ${json[key]}\n`;
    }

    // todo: return retVal and on receiving side, use it to update the frontmatter
    return "---\n" + frontMatter + "---\n";
  };

  getTextStyle(type: string) {
    const documentStyles = _get(this.content, ["namedStyles", "styles"]);

    if (!documentStyles) return {};

    const style = documentStyles.find(
      (style: { namedStyleType: any }) => style.namedStyleType === type
    );
    return style.textStyle;
  }

  getImage(
    el: { inlineObjectElement: { inlineObjectId: string | number } },
    options: { skipImages: any }
  ) {
    if (options.skipImages) return;

    const { inlineObjects } = this.content;

    if (!inlineObjects || !el.inlineObjectElement) {
      return;
    }

    const inlineObject = inlineObjects[el.inlineObjectElement.inlineObjectId];
    const embeddedObject = inlineObject.inlineObjectProperties.embeddedObject;
    const size = embeddedObject.size;

    return {
      source: embeddedObject.imageProperties.contentUri,
      title: embeddedObject.title || "",
      alt: embeddedObject.description || "",
      height: Math.round(size?.height?.magnitude) + size?.height?.unit || "",
      width: Math.round(size?.width?.magnitude) + size?.width?.unit || "",
    };
  }

  processCover(options: any) {
    const headers = this.content.headers;
    const documentStyle = this.content.documentStyle;
    const firstPageHeaderId = _get(documentStyle, ["firstPageHeaderId"]);

    if (!firstPageHeaderId) {
      return;
    }

    const headerElement = _get(headers[firstPageHeaderId], [
      "content",
      0,
      "paragraph",
      "elements",
      0,
    ]);

    const image = this.getImage(headerElement, options);

    if (image) {
      this.cover = {
        image: image.source,
        title: image.title,
        alt: image.alt,
      };
    }
  }

  getTableCellContent(content: { paragraph: any }[], options: any) {
    return content
      .map(({ paragraph }) =>
        paragraph.elements
          .map((el: any) => {
            return this.formatText(el, { inlineImages: true }, options);
          })
          .join("")
      )
      .join("")
      .replace(/\n/g, "<br/>"); // Replace newline characters by <br/> to avoid multi-paragraphs
  }

  indentText(text: any, level: number) {
    return `${_repeat(HORIZONTAL_TAB_CHAR, level)}${text}`;
  }

  stringifyContent(tagContent: any[]) {
    return tagContent.join("").replace(/\n$/, "");
  }

  appendToList({ list, listItem, elementLevel, level }: any) {
    const lastItem = list[list.length - 1];

    if (listItem.level > level) {
      if (typeof lastItem === "object") {
        this.appendToList({
          list: lastItem.value,
          listItem,
          elementLevel,
          level: level + 1,
        });
      } else {
        list.push({
          type: listItem.tag,
          value: [listItem.text],
        });
      }
    } else {
      list.push(listItem.text);
    }
  }

  getListTag(listId: any, level: number) {
    const glyph = _get(this.content, [
      "lists",
      listId,
      "listProperties",
      "nestingLevels",
      level,
      "glyphType",
    ]);

    return glyph ? "ol" : "ul";
  }

  processList(
    paragraph: {
      bullet: { listId?: any; nestingLevel?: any };
      elements: any[];
    },
    index: number,
    options: { skipLists: any }
  ) {
    if (options.skipLists) return;

    const prevListId = _get(this.content, [
      "body",
      "content",
      index - 1,
      "paragraph",
      "bullet",
      "listId",
    ]);
    const isPrevList = prevListId === paragraph.bullet.listId;
    const prevList = _get(this.elements, [this.elements.length - 1, "value"]);
    const textArray = paragraph.elements.map((el: any) => {
      return this.formatText(el, { inlineImages: true }, options);
    });
    const text = this.stringifyContent(textArray);

    if (isPrevList && Array.isArray(prevList)) {
      const { nestingLevel } = paragraph.bullet;

      if (nestingLevel) {
        this.appendToList({
          list: prevList,
          listItem: {
            text,
            level: nestingLevel,
            tag: this.getListTag(paragraph.bullet.listId, prevList.length),
          },
          level: 0,
        });
      } else {
        prevList.push(text);
      }
    } else {
      this.elements.push({
        type: this.getListTag(paragraph.bullet.listId, 0),
        value: [text],
      });
    }
  }

  processParagraph(
    paragraph: {
      paragraphStyle: { namedStyleType: any; indentStart: { magnitude: any } };
      bullet: any;
      elements: any[];
    },
    index: any,
    options: any
  ) {
    const headingTag = paragraph.paragraphStyle.namedStyleType;
    const { isHeading, tag } = this.getTag(headingTag, options);

    // Lists
    if (paragraph.bullet) {
      this.processList(paragraph, index, options);
      return;
    }

    let tagContentArray: string[] = [];

    paragraph.elements.forEach(
      (el: {
        pageBreak: any;
        horizontalRule: any;
        footnoteReference: { footnoteNumber: any; footnoteId: string | number };
      }) => {
        if (el.pageBreak) {
          return;
        }

        // <hr />
        else if (el.horizontalRule) {
          tagContentArray.push("<hr/>");
        }

        // Footnotes
        else if (el.footnoteReference) {
          if (options.skipFootnotes) return;

          tagContentArray.push(`[^${el.footnoteReference.footnoteNumber}]`);
          this.footnotes[el.footnoteReference.footnoteId] =
            el.footnoteReference.footnoteNumber;
        }

        // Headings
        else if (isHeading) {
          if (options.skipHeadings) return;

          const text = this.formatText(
            el as any,
            {
              namedStyleType: headingTag,
            },
            options
          );

          if (text) {
            tagContentArray.push(text);
          }
        }

        // Texts
        else {
          const text = this.formatText(
            el as any,
            { inlineImages: true },
            options
          );

          if (text) {
            tagContentArray.push(text);
          }
        }
      }
    );

    if (tagContentArray.length === 0) return;

    let content = this.stringifyContent(tagContentArray);
    let tagIndentLevel = 0;

    if (paragraph.paragraphStyle.indentStart) {
      const { magnitude } = paragraph.paragraphStyle.indentStart;
      tagIndentLevel = Math.round(magnitude / GOOGLE_DOCS_INDENT);
    }

    if (tagIndentLevel > 0) {
      content = this.indentText(content, tagIndentLevel);
    }

    this.elements.push(
      ...this.htmlFormatter({
        paragraph,
        type: tag,
        value: content,
      })
    );

    if (isHeading) {
      /* TODO: refactor code below - define heading when
         creating them, rather than after the fact */
      let indexPos = this.elements.length - 1;
      while (this.elements[indexPos].value !== content) {
        indexPos = indexPos - 1;
      }
      this.headings.push({
        tag,
        text: content,
        indexPos,
      });
    }
    // todo: write to file
  }

  getTag(
    headingTag:
      | "HEADING_1"
      | "HEADING_2"
      | "HEADING_3"
      | "HEADING_4"
      | "HEADING_5"
      | "HEADING_6"
      | "NORMAL_TEXT"
      | "SUBTITLE"
      | "TITLE",
    options: { demoteHeadings: boolean }
  ) {
    const tags = {
      HEADING_1: "h1",
      HEADING_2: "h2",
      HEADING_3: "h3",
      HEADING_4: "h4",
      HEADING_5: "h5",
      HEADING_6: "h6",
      NORMAL_TEXT: "p",
      SUBTITLE: "h2",
      TITLE: "h1",
    };
    const tag = tags[headingTag] as any;
    const isHeading = tag.startsWith("h");
    if (options.demoteHeadings === true) {
      this.processDemoteHeadings();
    }
    return { isHeading, tag };
  }

  htmlFormatter({ paragraph, type, value }: any) {
    const alignment = paragraph.paragraphStyle.alignment;
    if (alignment === "CENTER") {
      return [
        {
          type: "html",
          value: '<div class="center" markdown="1">',
        },
        { type, value },
        { type: "html", value: "</div>" },
      ];
    }
    return [{ type, value }];
  }

  processQuote(table: { tableRows: any[] }, options: any) {
    if (options.skipQuotes) return;

    const firstRow = table.tableRows[0];
    const firstCell = firstRow.tableCells[0];
    const quote = this.getTableCellContent(firstCell.content, options);
    const blockquote = quote.replace(/“|”/g, ""); // Delete smart-quotes

    this.elements.push({ type: "blockquote", value: blockquote });
  }

  processCode(codeBlock: { tableRows: any[] }, options: any) {
    if (options.skipCodes) return;

    const firstRow = codeBlock.tableRows[0];
    const firstCell = firstRow.tableCells[0];
    const codeContent = firstCell.content
      .map(({ paragraph }: any) =>
        paragraph.elements
          .map((el: { textRun: { content: any } }) => el.textRun.content)
          .join("")
      )
      .join("")
      .replace(/\x0B/g, "\n") //eslint-disable-line no-control-regex
      .replace(/^\n|\n$/g, "")
      .split("\n");

    // "".split() -> [""]
    if (codeContent.length === 1 && codeContent[0] === "") return;

    let lang = null;
    const langMatch = codeContent[0].match(/^\s*lang:\s*(.*)$/);

    if (langMatch) {
      codeContent.shift();
      lang = langMatch[1];
    }

    this.elements.push({
      type: "code",
      value: {
        language: lang,
        content: codeContent,
      },
    });
  }

  processTable(table: { tableRows: [any, ...any[]] }, options: any) {
    if (options.skipTables) return;

    const [thead, ...tbody] = table.tableRows;

    this.elements.push({
      type: "table",
      value: {
        headers: thead.tableCells.map(({ content }: any) =>
          this.getTableCellContent(content, options)
        ),
        rows: tbody.map((row: { tableCells: { content: any }[] }) =>
          row.tableCells.map(({ content }) =>
            this.getTableCellContent(content, options)
          )
        ),
      },
    });
  }

  processFootnotes(options: any) {
    if (options.skipFootnotes) return;

    const footnotes: { type: string; value: { number: any; text: any } }[] = [];
    const documentFootnotes = this.content.footnotes;

    if (!documentFootnotes) return;

    Object.entries(documentFootnotes).forEach(([, value]) => {
      const paragraphElements = (value as any).content[0].paragraph.elements;
      const tagContentArray = paragraphElements.map((el: any) => {
        // todo: refactor this
        const text = this.formatText(el, { inlineImages: true }, options);
        return text;
      });
      const tagContentString = this.stringifyContent(tagContentArray);

      footnotes.push({
        type: "footnote",
        value: {
          number: this.footnotes[(value as any).footnoteId],
          text: tagContentString,
        },
      });
    });

    footnotes.sort(
      (footnote1, footnote2) =>
        parseInt(footnote1.value.number) - parseInt(footnote2.value.number)
    );

    this.elements.push(...footnotes);
  }

  processDemoteHeadings() {
    this.headings.forEach(
      (heading: { tag: string; indexPos: string | number; text: any }) => {
        const levelevel = Number(heading.tag.substring(1));
        const newLevel = levelevel < 6 ? levelevel + 1 : levelevel;
        this.elements[heading.indexPos] = {
          type: "h" + newLevel,
          value: heading.text,
        };
      }
    );
  }

  processInternalLinks(links: any = {}) {
    if (Object.keys(links).length > 0) {
      const elementsStringified = JSON.stringify(this.elements);

      const elementsStringifiedWithRelativePaths = elementsStringified.replace(
        /https:\/\/docs.google.com\/document\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)(?:\/edit|\/preview)?/g,
        (match, id) => {
          return match;
        }
      );

      this.elements = JSON.parse(elementsStringifiedWithRelativePaths);
    }
  }

  process(customOptions?: any, links: any = {}) {
    this.cover = null;
    this.elements = [];
    this.headings = [];
    this.footnotes = {};
    const options = _merge(DEFAULT_OPTIONS, customOptions || {});

    // Keep the class scope in loops
    this.formatText = this.formatText.bind(this);
    // this.normalizeElement = this.normalizeElement.bind(this);

    this.bodyFontSize = _get(
      this.getTextStyle("NORMAL_TEXT"),
      "fontSize.magnitude"
    );

    this.processCover(options);

    this.content.body.content.forEach(
      ({ paragraph, table, sectionBreak, tableOfContents }: any, i: any) => {
        // Unsupported elements
        if (sectionBreak || tableOfContents) {
          return;
        }

        if (table) {
          // Quotes
          if (isQuote(table)) {
            this.processQuote(table, options);
          }

          // Code Blocks
          else if (isCodeBlocks(table)) {
            this.processCode(table, options);
          }

          // Tables
          else {
            this.processTable(table, options);
          }
        }

        // Paragraphs
        else {
          this.processParagraph(paragraph, i, options);
        }
      }
    );

    // Footnotes
    this.processFootnotes(options);

    this.processInternalLinks(links);
  }

  // todo: try this out see if no value provided FrontMatter is added
  toMarkdown({
    includeFrontMatter = true,
    includeJsonData = true,
    options = {},
  } = {}) {
    const markdownFrontMatter = this.elements.map(normalizeElement);
    const markdownContent = json2md(markdownFrontMatter);
    const markdownFrontmatter = includeFrontMatter
      ? getFrontMatter(this, options)
      : "";

    return `${markdownFrontmatter}${markdownContent}`;
    // return `${markdownFrontmatter}${markdownContent}`;
  }
}

export { GdocObj };
