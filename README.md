<div id="top"></div>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Editor</h3>
  <p align="center">
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://tanthang.dev">Website</a>
    ·
    <a href="https://github.com/TanThangDev/editor/issues">Report Bug</a>
    ·
    <a href="https://github.com/TanThangDev/editor/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<summary>Table of Contents</summary>
<ol>
  <li><a href="#SSR">SSR</a></li>
  <li><a href="#ClassicEditor">ClassicEditor</a></li>
  <li><a href="#BalloonEditor">BalloonEditor</a></li>
  <li><a href="#DecoupledEditor">DecoupledEditor</a></li>
  <li><a href="#InlineEditor">InlineEditor</a></li>
</ol>
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Install

- npm
  ```sh
  npm install @sevendev/editor --save
  ```

## Set type editor

```js
import { SevenDevEditor } from '@sevendev/editor';

declare global {
  interface Window {
    editor: SevenDevEditor;
  }
}
```

### Full example client side

- Fix window.document is not defined editor

```js
import React, { Fragment, useEffect, useRef } from "react";

interface IEditorProps {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange?: (value: any) => void;
}

const FullEditor = (props: IEditorProps) => {
  const editorRef = useRef<any>(null);
  const initialRender = useRef<string[]>([]);

  // const saveValue = (newContent: string) => {
  //   if (props.onChange) props.onChange(newContent);
  // };

  useEffect(() => {
    if (!window.editor) {
      const SevenDevEditor = require("@sevendev/editor");
      window.editor = SevenDevEditor;
    }
    if (
      !window.editor ||
      !props.name ||
      initialRender.current.includes(props.id)
    )
      return;

    if (editorRef.current) {
      initialRender.current.push(props.id);
      window.editor.ClassicEditor.create(editorRef.current, {
        wordCount: {
          onUpdate: (stats: { words: number; characters: number }) => {
            const divCount = document.querySelector("#count-word-editor");
            if (divCount)
              divCount.innerHTML =
                stats.words +
                " " +
                "words, " +
                stats.characters +
                " " +
                "characters";
          },
        },
        // mention: {
        //   feeds: [
        //     {
        //       marker: "#",
        //       feed: (query: string) => getFeedItems(query),
        //       itemRenderer: (item: any) => customItemRenderer(item, hashtags),
        //       minimumCharacters: 1,
        //     },
        //   ],
        // },
        // autosave: {
        //   save: async (editor: any) => {
        //     saveValue(editor.getData());
        //   },
        //   waitingTime: 100,
        // },
        placeholder: props.placeholder || "",
        id: props.id || "",
      })
        .then((editor: any) => {
          editorRef.current = editor;
          editorRef.current.setData(props.value);
        })
        .catch((err: any) => {
          console.error(err.stack);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div id="count-word-editor"></div>
      <div
        {...props}
        ref={editorRef}
        className="border-shadow-none ckeditor blog-content"
        id={`editor_${props.id}`}
      ></div>
    </Fragment>
  );
};

export default FullEditor;

```

## ClassicEditor

```js
import { ClassicEditor } from '@sevendev/editor';
ClassicEditor.create(document.querySelector('#editor'), {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
})
  .then((editor) => {
    window.ClassicEditor = editor;
  })
  .catch((error) => {
    console.error('There was a problem initializing the editor.', error);
  });
```

## BalloonEditor

```js
import { BalloonEditor } from '@sevendev/editor';
BalloonEditor.create(document.querySelector('#editor'), {
  blockToolbar: [
    'heading',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'alignment',
    '|',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'link',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
})
  .then((editor) => {
    window.BalloonEditor = editor;
  })
  .catch((error) => {
    console.error('There was a problem initializing the editor.', error);
  });
```

## DecoupledEditor

```html
<div id="toolbar-container"></div>
<h2>The editable</h2>
<div class="editable-container"></div>
```

```js
import { DecoupledEditor } from '@sevendev/editor';
const editorData = `<h2>Sample</h2>
		<p>This is an instance of the <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/predefined-builds.html#document-editor">document editor build</a>.</p>
		<figure class="image">
			<img src="../tests/manual/sample.jpg" alt="Autumn fields" />
		</figure>
		<p>You can use this sample to validate whether your <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/custom-builds.html">custom build</a> works fine.</p>`;

DecoupledEditor.create(editorData)
  .then((editor) => {
    window.editor = editor;

    document
      .querySelector('.toolbar-container')
      .appendChild(editor.ui.view.toolbar.element);
    document
      .querySelector('.editable-container')
      .appendChild(editor.ui.view.editable.element);
  })
  .catch((error) => {
    console.error('There was a problem initializing the editor.', error);
  });
```

## InlineEditor

```js
import { InlineEditor } from '@sevendev/editor';
InlineEditor.create(document.querySelector('#editor'), {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
})
  .then((editor) => {
    window.InlineEditor = editor;
  })
  .catch((error) => {
    console.error('There was a problem initializing the editor.', error);
  });
```

<!-- SETTING -->

[contributors-shield]: https://img.shields.io/github/contributors/TanThangDev/editor.svg?style=for-the-badge
[contributors-url]: https://github.com/TanThangDev/editor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TanThangDev/editor.svg?style=for-the-badge
[forks-url]: https://github.com/TanThangDev/editor/network/members
[stars-shield]: https://img.shields.io/github/stars/TanThangDev/editor.svg?style=for-the-badge
[stars-url]: https://github.com/TanThangDev/editor/stargazers
[issues-shield]: https://img.shields.io/github/issues/TanThangDev/editor.svg?style=for-the-badge
[issues-url]: https://github.com/TanThangDev/editor/issues
[license-shield]: https://img.shields.io/github/license/TanThangDev/editor.svg?style=for-the-badge
[license-url]: https://github.com/TanThangDev/editor/blob/master/LICENSE
