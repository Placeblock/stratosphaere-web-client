import { Schema } from "prosemirror-model";

export function getEditorSchema() {
    return new Schema({
        nodes: {
            doc: {content: "text*"},
            text: {}
        }
    })
}