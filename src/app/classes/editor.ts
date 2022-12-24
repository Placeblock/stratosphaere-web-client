import hljs from "highlight.js";
import Quill from 'quill';
import { ImageData as QuillImageData } from 'quill-image-drop-and-paste'
const VideoBase = Quill.import('formats/video');
const ImageBase = Quill.import('formats/image');


const toolbar = {
    container: [[{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ],
    ]
}

const syntax = {
    highlight: (text: string) => {
        return hljs.highlightAuto(text).value;
    }
}

export function getEditorModules() {
    return {'formula': true,
        'blotFormatter': true,
        'syntax': syntax,
        'history': true,
        'toolbar': toolbar
    }
}

export function getViewModules() {
    return {
        'formula':true,
        'syntax': syntax
    }
}

const ATTRIBUTES = [
    'alt',
    'height',
    'width',
    'style' // This is the added difference that needs to be saved properly
  ];
  
export class CustomVideo extends VideoBase {
    declare domNode: HTMLElement; // Needed declaration for Typescript
    static formats(domNode: HTMLElement) {
        return gformats(domNode);
    }
    format(name: string, value: any) {
        gformat(this.domNode, name, value, super.format);
    }
}

export class CustomImage extends ImageBase {
    declare domNode: HTMLElement; // Needed declaration for Typescript
    static formats(domNode: HTMLElement) {
        return gformats(domNode);
    }
    format(name: string, value: any) {
        gformat(this.domNode, name, value, super.format);
    }
}


function gformat(domNode: HTMLElement, name: string, value: any, sformat: any) {
    if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
            domNode.setAttribute(name, value);
        } else {
            domNode.removeAttribute(name);
        }
    } else {
        sformat(name, value);
    }
}

function gformats(domNode: HTMLElement) {
    return ATTRIBUTES.reduce((formats: any, attribute) => {
        const copy = { ...formats };

        if (domNode.hasAttribute(attribute)) {
        copy[attribute] = domNode.getAttribute(attribute);
        }

        return copy;
    }, {});
}