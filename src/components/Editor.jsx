// import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
// import Codemirror from "codemirror";
// import { useEffect } from "react";
// import 'codemirror/addon/edit/closetag'
// import 'codemirror/addon/edit/closebrackets'
// import 'codemirror/theme/material-darker.css'
// import "codemirror/mode/javascript/javascript"
// import "codemirror/lib/codemirror.css"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { atomone } from '@uiw/codemirror-theme-atomone';
import React, { useEffect } from 'react';
import ACTIONS from '../Actions';

const Editor = ({ value, socketRef, roomID }) => {

    const onChange = React.useCallback((value, viewUpdate) => {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomID,
            value,
        });
    }, []);


    // useEffect(() => {
    //     async function init() {
    //         Codemirror.fromTextArea(document.getElementById('Editor'),
    //         {
    //             mode: { name :'javascript', json:true},
    //             theme: "material-darker",
    //             autoCloseTags: true,
    //             autoCloseBrackets: true,
    //             lineNumbers:true
    //         }
    //         )
    //     }
    //     init();
    // },[])

    return (
        <CodeMirror value={value} className='text-[20px]' height="100vh" theme={atomone} extensions={[javascript({ jsx: true })]} onChange={onChange} />
        //    <textarea className="" id="Editor"></textarea>
    );
}

export default Editor;