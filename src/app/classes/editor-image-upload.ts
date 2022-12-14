import Quill, { DeltaStatic, RangeStatic } from "quill";
import { catchError, concatMap, first, from, Observable, of, tap, throwError } from "rxjs";
const ImageBase = Quill.import('formats/image');

export class PlaceholderImage extends ImageBase {
    static className = 'image-uploading';  
    static blotName = 'imageUploadPlaceholder';
}

export class ImageUploadModule {
    quill: Quill;
    options: {'upload': (file: File) => Observable<string>, 'delete': (fileName: string) => void};
    range: RangeStatic | null;

    constructor(quill: Quill, options: {'upload': (file: File) => Observable<string>, 'delete': (url: string) => void}) {
        this.quill = quill;
        this.options = options;
        this.range = null;
        
        this.quill.root.addEventListener('drop', this.handleDrop.bind(this), false)
        this.quill.root.addEventListener('paste', this.handlePaste.bind(this), false)

        this.quill.getModule('toolbar')
            .addHandler('image', this.selectLocalImage.bind(this));

        this.quill.on("text-change", this.handleTextChange.bind(this));
    }

    handleTextChange(delta: DeltaStatic, oldDelta: DeltaStatic, source: string) {
        if (this.quill == undefined) return;
        let currrentContents = this.quill.getContents();
        let diff = currrentContents.diff(oldDelta);
        console.log("2")
        if (diff.ops == undefined) return;
        console.log("TEST")
        for (let op of diff.ops) {
            let url: string = op.insert?.image;
            console.log(url);
            if (url == null) continue;
            this.options.delete(url.substring(url.lastIndexOf('/') + 1));
        }
    }
    
    selectLocalImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        var _me = this;
        input.onchange = function() {
            if (input.files == null) return;
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                _me.saveToServer(file).subscribe();
            }
        }
    }

    saveToServer(file: File): Observable<void> {
        return new Observable(subscriber => {
            this.range = this.quill.getSelection(true);
            //Disable Quill to prevent user from changing the document
            this.quill.disable();
            this.createImagePlaceholder(file);
            this.options.upload(file).pipe(
                first(),
                tap(() => {
                    this.deleteImagePlaceholder();
                    this.quill.enable();
                }),
                catchError(res => {
                    subscriber.complete();
                    return throwError(() => res);
                })
            ).subscribe(url => {
                this.insertToEditor(url);
                if (this.range != null) {
                    this.quill.setSelection(this.range?.index + 1, this.range?.length);
                }
                subscriber.complete();
            })
        })
    }

    insertToEditor(url: string) {
        if (this.range == null) return;
        this.quill.insertEmbed(this.range.index, 'image', url, "user");
    }

    deleteImagePlaceholder() {
        if (this.range == null) return;
        this.quill.deleteText(this.range.index, 1, "api");
    }

    createImagePlaceholder(file: File) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            if (this.range == null) return;
            this.quill.insertEmbed(this.range.index, 'imageUploadPlaceholder', reader.result, "api");
        }, false);
        reader.readAsDataURL(file);
    }


    handleDrop(e: DragEvent) {
        //dataTransfer contains information about the content being dragged
        const dataTransfer = e.dataTransfer;
        if (!dataTransfer || !dataTransfer.items) return;
        e.preventDefault();
        //Check support for getting index by cursor position
        //If there is support set the cursor to the hovered position
        if (document.caretRangeFromPoint) {
            const selection = document.getSelection();
            const range = document.caretRangeFromPoint(e.clientX, e.clientY);
            if (selection && range) {
                selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset)
            }
        }
        this.handleFiles(dataTransfer.items);
    }

    handlePaste(e: ClipboardEvent) {
        if (e.clipboardData && e.clipboardData.items && e.clipboardData.files.length) {  
            console.log(e.clipboardData.files);
            e.preventDefault();
            this.handleFiles(e.clipboardData.items);
        }
    }

    handleFiles(transferItemList: DataTransferItemList) {
        from(transferItemList).pipe(
            concatMap(transferItem => {
                if (!transferItem.type.match(/^image\/(gif|jpe?g|a?png)/i)) return of();
                const file = transferItem.getAsFile();
                if (file === null) return of();
                return this.saveToServer(file);
            })
        ).subscribe()

    }
}