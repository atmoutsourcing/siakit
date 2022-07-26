import { useRef } from 'react';

import { Editor as EditorProps } from '@tiptap/react';

import { Flex } from '../../Flex';
import { IconButton } from '../../IconButton';
import { Separator } from '../../Separator';
import { Tooltip } from '../../Tooltip';

interface MenuBarProps {
  editor: EditorProps | null;
}

export function MenuBar({ editor }: MenuBarProps): JSX.Element {
  const inputFileRef = useRef<HTMLInputElement>(null);

  function setLink(): void {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      if (url === null) {
        return;
      }

      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();

        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  }

  if (!editor) {
    return <></>;
  }

  return (
    <>
      <input
        ref={inputFileRef}
        type="file"
        onChange={(event) => {
          if (event.target.files?.length) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
              if (editor) {
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: reader.result as string,
                  })
                  .run();
              }
            };
            reader.readAsDataURL(file);
          }
        }}
        style={{ display: 'none' }}
      />

      <Flex padding="4px 4px 0">
        <Tooltip content="Heading 1">
          <IconButton
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            icon="TbH1"
            variant={
              editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'
            }
          />
        </Tooltip>

        <Tooltip content="Heading 2">
          <IconButton
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            icon="TbH2"
            variant={
              editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'
            }
          />
        </Tooltip>

        <Tooltip content="Heading 3">
          <IconButton
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            icon="TbH3"
            variant={
              editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'
            }
          />
        </Tooltip>

        <Separator direction="vertical" />

        <Tooltip content="Bold">
          <IconButton
            type="button"
            icon="TbBold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Tooltip content="Italic">
          <IconButton
            type="button"
            icon="TbItalic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Tooltip content="Strike">
          <IconButton
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon="TbStrikethrough"
            variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Separator direction="vertical" />

        <Tooltip content="Code">
          <IconButton
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            icon="TbCode"
            variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Tooltip content="Quote">
          <IconButton
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon="TbQuote"
            variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        {editor.isActive('link') ? (
          <Tooltip content="Link">
            <IconButton
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              variant="secondary"
              icon="TbUnlink"
            />
          </Tooltip>
        ) : (
          <Tooltip content="Remove link">
            <IconButton
              type="button"
              onClick={setLink}
              variant="ghost"
              icon="TbLink"
            />
          </Tooltip>
        )}

        <Separator direction="vertical" />

        <Tooltip content="List">
          <IconButton
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon="TbList"
            variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Tooltip content="Ordered list">
          <IconButton
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon="TbListNumbers"
            variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Tooltip content="To-Do list">
          <IconButton
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            icon="TbListDetails"
            variant={editor.isActive('taskList') ? 'secondary' : 'ghost'}
          />
        </Tooltip>

        <Tooltip content="Image">
          <Flex padding="0 16px">
            <IconButton
              type="button"
              icon="TbPhoto"
              onClick={() => inputFileRef.current?.click()}
            />
          </Flex>
        </Tooltip>
      </Flex>
    </>
  );
}
