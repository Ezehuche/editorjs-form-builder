/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
// import { Fragment, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
// import { persistNoCodeForm, useNoCodeForm } from "../../lib/noCodeForm";
// import Loading from "./Loading";
import EmailQuestion from "./tools/EmailQuestion";
import PageTransition from "./tools/PageTransition";
import MultipleChoiceQuestion from "./tools/MultipleChoiceQuestion";
import TextQuestion from "./tools/TextQuestion";
import WebsiteQuestion from "./tools/WebsiteQuestion";
import PhoneQuestion from "./tools/PhoneQuestion";
import NumberQuestion from "./tools/NumberQuestion";

interface EditorProps {
    id: string;
    autofocus: boolean;
    editorRef: { current: EditorJS | null };
    // formId: string;
    initAction: (editor: EditorJS) => void;
    onChange: (data: any) => void;
    initialData: { id: string, type: string, data: {} }[];
}

const Editor = ({
    id,
    autofocus = false,
    editorRef,
    initAction,
    onChange,
    initialData,
}: EditorProps) => {
    // const { noCodeForm, isLoadingNoCodeForm, mutateNoCodeForm } =
    //     useNoCodeForm(formId);

    const keyPressListener = React.useCallback((e: any) => {
        if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            toast("your work will be autosaved ✌️");
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener("keydown", keyPressListener);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keyPressListener);
        };
    }, [keyPressListener]);

    // This will run only once
    React.useEffect(() => {
        if (!editorRef.current) {
            initEditor();
        }
        return () => {
            destroyEditor();
        };
        async function destroyEditor() {
            await editorRef.current.isReady;
            editorRef.current.destroy();
            editorRef.current = null;
        }
    }, []);

    const initEditor = () => {
        // console.log("initial data", initialData);
        const editor = new EditorJS({
            minHeight: 0,
            holder: id,
            data: { blocks: initialData },
            onReady: () => {
                editorRef.current = editor;
                new DragDrop(editor);
                new Undo({ editor });
                initAction(editor);
                // console.log('block count', editor.blocks.getCurrentBlockIndex());
                // if (editor.blocks.getBlocksCount() === 1 && initialData[0].id === '') {
                //     initAction(editor);
                // }
            },
            onChange: async () => {
                const content = await editor.saver.save();
                console.log(content);
                onChange(content.blocks);
                // const newNoCodeForm = JSON.parse(JSON.stringify(noCodeForm));
                // newNoCodeForm.blocksDraft = content.blocks;
                // await persistNoCodeForm(newNoCodeForm);
                // mutateNoCodeForm(newNoCodeForm);
            },
            autofocus: autofocus,
            defaultBlock: "paragraph",
            tools: {
                textQuestion: TextQuestion,
                emailQuestion: EmailQuestion,
                multipleChoiceQuestion: MultipleChoiceQuestion,
                numberQuestion: NumberQuestion,
                phoneQuestion: PhoneQuestion,
                websiteQuestion: WebsiteQuestion,
                pageTransition: PageTransition,
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    config: {
                        placeholder:
                            "Start with your content or hit tab-key to insert block",
                    },
                },
                // header: {
                //     class: Header,
                //     config: {
                //         placeholder: "Enter a header",
                //         levels: [1, 2, 3],
                //         defaultLevel: 1,
                //     },
                // },
            },
        });
    };

    // if (isLoadingNoCodeForm) {
    //     return <Loading />;
    // }

    return (
        <React.Fragment>
            <div id={id} />
        </React.Fragment>
    );
};

export default Editor;