import Editor from './build/editor.js';

interface Editor {
  create: (el: HTMLElement, options: EditorOptions) => Promise<EditorInstance>;
}

interface EditorOptions {
  toolbar?:
    | string[]
    | {
        items?: string[];
        shouldNotGroupWhenFull?: boolean;
      };
  blockToolbar?:
    | string[]
    | {
        items?: string[];
        shouldNotGroupWhenFull?: boolean;
      };
  extraPlugins?: any[];
  autosave?: {
    save?(editor: EditorInstance): Promise<void>;
    waitingTime?: number;
  };
  placeholder?: string;
  id?: string;
  language?: string;
  image?: {
    toolbar?: string[];
    styles?: string[];
    resizeUnit?: string;
    resizeOptions?: {
      width?: number;
      height?: number;
    };
    upload?: {
      types?: string[];
      url?: string;
      headers?: {
        [key: string]: string;
      };
      withCredentials?: boolean;
      beforeSend?(xhr: XMLHttpRequest): void;
      onSuccess?(response: any): void;
      onError?(error: Error): void;
      onProgress?(event: ProgressEvent): void;
    };
    [key: string]: any; // Todo
  };
  table?: {
    contentToolbar?: string[];
    defaultHeadings?: {
      rows?: number;
      cols?: number;
    };
    tableToolbar?: string[];
    tableProperties?: {
      borderColors?: {
        color?: string;
        label?: string;
      }[];
      backgroundColors?: {
        color?: string;
        label?: string;
      }[];
    };
    tableCellProperties?: {
      borderColors?: {
        color?: string;
        label?: string;
      }[];
      backgroundColors?: {
        color?: string;
        label?: string;
      }[];
    };
  };
  licenseKey?: string;
  wordCount?: {
    container?: HTMLElement;
    displayWords?: boolean;
    displayCharacters?: boolean;
    onUpdate?(stats: { words: number; characters: number }): void;
  };
  simpleUpload?: {
    uploadUrl?: string;
    withCredentials?: boolean;
    headers?: {
      [key: string]: string;
    };
  };
  mention?: {
    feeds?: {
      marker?: string;
      feed?: any;
      itemRenderer?: any;
      minimumCharacters?: number;
      dropdownLimit?: number;
    }[];
  };
  mediaEmbed?: {
    providers?: {
      name?: string;
      url?: string;
      html?: string;
    }[];
    previewsInData?: boolean;
    extraProviders?: {
      name?: string;
      url?: string;
    }[];
    removeProviders?: string[];
  };
  alignment?: {
    options?: string[] | { name: string; className: string }[];
  };
  fontSize?: {
    options?: any[];
    supportAllValues?: boolean;
  };
  fontFamily?: {
    options?: string[];
    supportAllValues?: boolean;
  };
  fontColor?: {
    columns?: number;
    documentColors?: number;
    colors?: {
      color?: string;
      label?: string;
    }[];
  };
  fontBackgroundColor?: {
    columns?: number;
    documentColors?: number;
    colors?: {
      color?: string;
      label?: string;
    }[];
  };
  highlight?: {
    options?: {
      model?: string;
      class?: string;
      title?: string;
      color?: string;
      type?: string;
    }[];
  };
  codeBlock?: {
    languages?: { language: string; label: string }[];
  };
  heading?: {
    options?: {
      model: string;
      title: string;
      class: string;
      view?: any;
    }[];
  };
  link?: {
    defaultProtocol?: string;
    addTargetToExternalLinks?: boolean;
    decorators?:
      | LinkDecorator[]
      | {
          detectDownloadable?: LinkDecorator;
          toggleDownloadable?: LinkDecorator;
          openInNewTab?: LinkDecorator;
        };
  };
  htmlEmbed?: {
    showPreviews?: boolean;
    sanitizeHtml?: (html: string) => string;
  };
  ckfinder?: {
    uploadUrl?: string;
    options?: {
      resourceType?: string;
    };
    openerMethod?: 'popup' | 'dialog' | 'modal';
  };
  removePlugins?: string[];
}

interface LinkDecorator {
  mode?: string;
  callback?: (url: string) => string;
  label?: string;
  defaultValue?: string;
  attributes?: {
    class?: string;
    download?: string;
    target?: string;
    rel?: string;
    [key: string]: any;
  };
}

interface EditorInstance {
  setData: (data: string) => void;
  getData?: () => string;
  // ...
}

interface SevenDevEditor {
  ClassicEditor: Editor;
  BalloonEditor: Editor;
  DecoupledEditor: Editor;
  InlineEditor: Editor;
}

const ClassicEditor: Editor = Editor.ClassicEditor;
const BalloonEditor: Editor = Editor.BalloonEditor;
const DecoupledEditor: Editor = Editor.DecoupledEditor;
const InlineEditor: Editor = Editor.InlineEditor;

export {
  SevenDevEditor,
  Editor,
  EditorOptions,
  EditorInstance,
  ClassicEditor,
  BalloonEditor,
  DecoupledEditor,
  InlineEditor,
};
