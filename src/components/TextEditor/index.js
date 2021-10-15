import React, { useMemo, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactQuill, { Quill } from 'react-quill'
import katex from 'katex'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../store/notification'
import { ImageResize } from 'quill-image-resize-module'
import ImageUploader from './ImageUploader'
import 'react-quill/dist/quill.snow.css'
import 'katex/dist/katex.min.css'
import './styles.css'
window.katex = katex
const useStyles = makeStyles((theme) => ({
    container: {
        margin: '30px 0px',
    },
}))

Quill.register('modules/imageResize', ImageResize)

function Editor(props) {
    const classes = useStyles(props)
    const quill = useRef(null)
    const dispatch = useDispatch()
    const imageHandler = () => {
        const quillEditor = quill.current.getEditor()
        const option = {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData()
                    formData.append('image', file)
                    fetch(
                        'https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22',
                        {
                            method: 'POST',
                            body: formData,
                        }
                    )
                        .then((response) => response.json())
                        .then((result) => {
                            resolve(result.data.url)
                        })
                        .catch((error) => {
                            setNotification({
                                message: 'Failed To Upload Image',
                                severity: 'error',
                            })
                            reject('Upload failed')
                        })
                })
            },
        }

        const obj = new ImageUploader()
        obj.selectLocalImage(quillEditor, option)
    }
    const toolbarOptions = useMemo(
        () => ({
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom dropdown
                [
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    { color: [] },
                    { background: [] },
                ],
                [
                    { align: [] },
                    { indent: '-1' },
                    { indent: '+1' },
                    { direction: 'rtl' },
                ],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

                ['blockquote', 'code-block', 'formula'],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            handlers: { image: imageHandler },
        }),
        []
    )
    return (
        <div className={classes.container}>
            <ReactQuill
                ref={quill}
                id="content"
                key="content-window"
                autoFocus={false}
                theme="snow"
                modules={{
                    toolbar: toolbarOptions,

                    imageResize: {
                        displaySize: true,
                        modules: ['Resize', 'DisplaySize', 'Toolbar'],
                    },
                }}
                placeholder={props.placeholder}>
                <div id="#editor"></div>
            </ReactQuill>
        </div>
    )
}

export default Editor
