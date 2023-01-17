import React, { useRef } from 'react';
import EditorJS from "@editorjs/editorjs";
import Editor from './lib/Editor';

export default function Builder(onChange: () => void) {
    const editorRef = useRef<EditorJS | null>();

    const initAction = async (editor: EditorJS) => {
        // console.log(editor);
        // editor.blocks.insert("header", {
        //     text: 'Your Company Name',
        // });
        const focusBlock = editor.blocks.insert("textQuestion");
        editor.blocks.delete(0); // remove defaultBlock
        editor.caret.setToBlock(
            editorRef.current.blocks.getBlockIndex(focusBlock.id)
        );
    };

    return (
        <>
            <div className="w-full h-full mb-20 overflow-auto bg-white">
                <div className="flex justify-center w-full pt-10 pb-56">
                    <main className='w-full h-full max-w-5xl mx-auto'>
                        <Editor
                            id="editor"
                            editorRef={editorRef}
                            autofocus={true}
                            initAction={initAction}
                            onChange={onChange}
                        />
                    </main>
                </div>
            </div>
        </>
    )
}