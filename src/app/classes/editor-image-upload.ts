import Quill, { RangeStatic } from "quill";
import { catchError, first, Observable, tap, throwError } from "rxjs";
const ImageBase = Quill.import('formats/image');

export class PlaceholderImage extends ImageBase {
    static className = 'image-uploading';  
    static blotName = 'imageUploadPlaceholder';
}

export class ImageUploadModule {
    quill: Quill;
    options: {'upload': (file: File) => Observable<string>};
    range: RangeStatic | null;

    constructor(quill: Quill, options: {'upload': (file: File) => Observable<string>}) {
        this.quill = quill;
        this.options = options;
        this.range = null;

        this.quill.getModule('toolbar')
            .addHandler('image', this.selectLocalImage.bind(this));
    }
    
    selectLocalImage() {
        this.range = this.quill.getSelection(true);
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        var _me = this;
        input.onchange = function() {
            if (input.files == null) return;
                const file = input.files[0];
            if (/^image\//.test(file.type)) {
                _me.saveToServer(file);
            }
        }
    }

    saveToServer(file: File) {
        //Disable Quill to prevent user from changing the document
        this.quill.disable();
        this.createImagePlaceholder(file);
        this.options.upload(file).pipe(
            first(), 
            catchError(res => {
                return throwError(() => res);
            }),
            tap(() => {
                this.deleteImagePlaceholder();
                this.quill.enable();
            })
        ).subscribe(url => {
            this.insertToEditor(url);
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
            console.log(this.quill.insertEmbed(this.range.index, 'imageUploadPlaceholder', reader.result, "api"));
        }, false);
        reader.readAsDataURL(file);
    }
}