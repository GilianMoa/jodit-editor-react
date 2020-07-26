import React from 'react';
import { Jodit } from 'jodit'
import JoditReact from "jodit-react";
import { FileUpload } from '../../services/cloudinaryService';

class JoditEditor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            editorContent: ''
        }

        this.editorConfig = {
            readonly: false,
            autofocus: true,
            tabIndex: 1,

            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            defaultActionOnPaste: 'insert_clear_html',

            placeholder: 'Write something awesome ...',
            beautyHTML: true,
            toolbarButtonSize: "large",
            buttons: [
                'source',
                '|', 'bold', 'italic',
                '|', 'ul', 'ol',
                '|', 'font', 'fontsize', 'brush', 'paragraph',
                '|', 'video', 'table', 'link',
                '|', 'left', 'center', 'right', 'justify',
                '|', 'undo', 'redo',
                '|', 'hr', 'eraser', 'fullsize'
            ],
            extraButtons: ["uploadImage", "codeBlock"]
        }
    }

    componentWillMount() {
        this.uploadImageButton();
        this.codeBlockButton();

    }

    uploadImageButton = () => {
        Jodit.defaultOptions.controls.uploadImage = {
            name: 'Upload image to Cloudinary',
            iconURL: "https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png",
            exec: (async (editor) => {
                await this.imageUpload(editor);
            })
        };
    }

    codeBlockButton = () => {
        Jodit.defaultOptions.controls.codeBlock = {
            name: 'Code Block',
            iconURL: "https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png",
            exec: (async (editor) => {
                const pre = editor.selection.j.createInside.element('pre');
                pre.style = 'background-color:#F0F0F0; text-align:left; padding:10px' // this can be done by adding an editor class: editorCssClass: my-class - see doc https://xdsoft.net/jodit/v.2/doc/Jodit.defaultOptions.html
                pre.innerHTML = `${editor.selection.html}`;
                editor.selection.insertNode(pre);
            }),
        };
    }

    imageUpload = (editor) => {

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async function () {

            const imageFile = input.files[0];

            if (!imageFile) {
                return;
            }

            if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                return;
            }

            const imageInfo = await FileUpload(imageFile);;

            this.insertImage(editor, imageInfo.url);

        }.bind(this);
    }

    insertImage = (editor, url) => {
        const image = editor.selection.j.createInside.element('img');
        image.setAttribute('src', url);
        editor.selection.insertNode(image);
    }

    onChange = (value) => { }

    setContent = (newContent) => { }

    render() {
        return (
            <React.Fragment>
                <JoditReact
                    value={this.state.editorContent}
                    config={this.editorConfig}
                    onChange={this.onChange.bind(this)}
                    onBlur={newContent => this.setContent(newContent)}
                />
            </React.Fragment>
        )
    }
}

export default JoditEditor;
