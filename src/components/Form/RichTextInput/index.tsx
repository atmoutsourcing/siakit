import { useEffect, useRef, useState } from 'react';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useField } from '@unform/core';

import { useTheme } from '../../../hooks/theme';
import { Separator } from '../../Separator';
import { RichTextInputContainer, Label, Error } from '../styles';
import { MenuBar } from './MenuBar';
import { Content } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}
type RichTextInputProps = JSX.IntrinsicElements['input'] & Props;

export function RichTextInput({
  name,
  label,
  disabled,
  onBlur,
  onFocus,
  onChange,
  placeholder,
}: RichTextInputProps): JSX.Element {
  const editorRef = useRef(null);

  const { colorScheme } = useTheme();

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  function handleBlur(
    event?: React.FocusEvent<HTMLInputElement, Element>,
  ): void {
    setIsFocused(false);

    if (onBlur && event) {
      onBlur(event);
    }
  }

  function handleFocus(
    event?: React.FocusEvent<HTMLInputElement, Element>,
  ): void {
    setIsFocused(true);

    if (onFocus && event) {
      onFocus(event);
    }
  }

  function handleChange(
    event?: React.ChangeEvent<HTMLInputElement> | null,
    data?: string,
  ): void {
    const value = data ?? event?.target.value;

    if (!value) {
      return;
    }

    setIsFilled(value);

    if (onChange && event) {
      onChange(event);
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      Image,
      TaskList.configure({
        HTMLAttributes: {
          class: 'editor-task-list',
        },
      }),
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: defaultValue,
    onUpdate: (value) => {
      handleChange(null, value.editor.getHTML());
    },
    onFocus: () => {
      handleFocus();
    },
    onBlur: () => {
      handleBlur();
    },
  });

  function setContent(content: string): void {
    if (editor) {
      editor.commands.setContent(content);
    }
  }

  useEffect(() => {
    if (disabled) {
      handleBlur();
    }
  }, [disabled]);

  function handleClear(): void {
    setIsFilled('');

    setContent('');
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: editorRef,
      getValue: () => {
        const value = editor?.getHTML() ?? '';

        if (!editor?.getText()) {
          return '';
        }

        return value;
      },
      setValue: (ref, value: string) => {
        ref.current.props.editor.commands.setContent(value);
      },
      clearValue: () => {
        handleClear();
      },
    });
  }, [fieldName, registerField, editor]);

  return (
    <RichTextInputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <Content
        colorScheme={colorScheme}
        flex
        overflow
        direction="column"
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        disabled={!!disabled}
      >
        <MenuBar editor={editor} />

        <Separator />

        <EditorContent
          ref={editorRef}
          editor={editor}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
          disabled={!!disabled}
        />
      </Content>

      {error && <Error>{error}</Error>}
    </RichTextInputContainer>
  );
}
