import React, { useEffect } from 'react'
import Editor from 'react-ace'

import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-text'

const snippets = {
    c_cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main()\n{\n\t// Code Here\n\treturn 0;\n}`,
    c: `#include<stdio.h>\nint main()\n{\n\t// Code here\n\treturn 0;\n}`,
    java: `import java.io.*;\n\npublic class Main{\n\n\tpublic static void main(String[] args){\n\t\t// Code here\n\t}\n\n}`,
    python: `# Code Here`,
    text: '',
}

function CodeEditor(props) {
    const { reset, value, mode, toggleReset, handleChange } = props
    useEffect(() => {
        if (reset) {
            toggleReset()
            handleChange(snippets[mode])
        }
    }, [reset, toggleReset, handleChange, mode])

    return (
        <Editor
            mode={mode === 'c' ? 'c_cpp' : mode.toLowerCase()}
            theme={props.theme.toLowerCase()}
            fontSize={props.fontSize}
            value={value}
            onChange={handleChange}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showGutter: true,

                showLineNumbers: true,
                readOnly: props.readOnly ? props.readOnly : false,
            }}
            style={{ width: '100%', height: '100%' }}></Editor>
    )
}

export default CodeEditor
