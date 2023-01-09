import classNames from 'classnames';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FC, LegacyRef, useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './form.module.scss';
import { ITextEditorProps } from './form.types';

const TextEditor: FC<ITextEditorProps> = ({
  onChange,
  value,
  placeholder,
  error,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [isUpdated, setIsUpdated] = useState(false);
  const textEditorRef = useRef<LegacyRef<Editor> | null>(null);

  useEffect(() => {
    try {
      if (isUpdated) return;

      const defaultValue = value || ``;

      const blocksFromHtml = htmlToDraft(defaultValue);

      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap,
      );

      const newEditorState = EditorState.createWithContent(contentState);

      setEditorState(newEditorState);
    } catch (e) {
      console.warn('invalid symbols');
    }
  }, [isUpdated, value]);

  useEffect(() => {
    return () => {
      if (editorState.clear) editorState.clear();
    };
  }, []);

  const onEditorStateChange = (editorState: EditorState) => {
    try {
      setIsUpdated(true);
      setEditorState(editorState);

      return onChange(
        draftToHtml(convertToRaw(editorState.getCurrentContent())),
      );
    } catch (e) {
      console.warn('invalid symbols');
    }
  };

  return (
    <div
      className={classNames(
        styles.common,
        styles.editorWrapper,
        `animate-fade`,
      )}
    >
      <label>
        <span>{placeholder}</span>
        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            spellCheck
            toolbar={{
              options: ['inline', 'blockType', 'list'],
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
              blockType: {
                inDropdown: false,
                options: [],
              },

              list: {
                inDrodown: false,
                options: ['unordered', 'ordered'],
              },
            }}
          />
        </div>
        {error && <span className={styles.error}>{error.message}</span>}
      </label>
    </div>
  );
};

export default TextEditor;
