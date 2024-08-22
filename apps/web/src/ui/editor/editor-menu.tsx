import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  Link2Icon,
  ListBulletIcon,
  QuoteIcon,
  ResetIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons'
import type { Editor } from '@tiptap/react'
import clsx from 'clsx'

import {
  EditorMenuDropdown,
  EditorMenuDropdownItem,
  EditorMenuDropdownList,
  EditorMenuDropdownTrigger,
} from './editor-menu-dropdown'
import styles from './editor-menu.module.css'

export const EditorMenu: React.FC<{ editor: Editor }> = ({ editor }) => (
  <ul className={styles.menu}>
    {/* Undo & Redo */}
    <li>
      <ul className={styles.menuGroup}>
        <li>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={styles.menuButton}
          >
            <ResetIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={styles.menuButton}
          >
            <ResetIcon style={{ transform: 'scale(-1, 1)' }} />
          </button>
        </li>
      </ul>
    </li>

    <hr />

    {/* Text Styles */}
    <li>
      <ul className={styles.menuGroup}>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={clsx(
              styles.menuButton,
              editor.isActive('bold') && styles.active,
            )}
          >
            <FontBoldIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={clsx(
              styles.menuButton,
              editor.isActive('italic') && styles.active,
            )}
          >
            <FontItalicIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={clsx(
              styles.menuButton,
              editor.isActive('underline') && styles.active,
            )}
          >
            <UnderlineIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={clsx(
              styles.menuButton,
              editor.isActive('strike') && styles.active,
            )}
          >
            <StrikethroughIcon />
          </button>
        </li>
      </ul>
    </li>

    <hr />

    {/* Headings */}
    <li>
      <EditorMenuDropdown>
        <EditorMenuDropdownTrigger className={styles.menuButton}>
          <HeadingIcon />
        </EditorMenuDropdownTrigger>
        <EditorMenuDropdownList>
          <EditorMenuDropdownItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive('heading', { level: 1 })}
          >
            <span>제목 1</span>
          </EditorMenuDropdownItem>
          <EditorMenuDropdownItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive('heading', { level: 2 })}
          >
            제목 2
          </EditorMenuDropdownItem>
          <EditorMenuDropdownItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive('heading', { level: 3 })}
          >
            제목 3
          </EditorMenuDropdownItem>
          <EditorMenuDropdownItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            isActive={editor.isActive('heading', { level: 4 })}
          >
            제목 4
          </EditorMenuDropdownItem>
        </EditorMenuDropdownList>
      </EditorMenuDropdown>
    </li>

    <hr />

    {/* Text Align */}
    <li>
      <ul className={styles.menuGroup}>
        <li>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={clsx(
              styles.menuButton,
              editor.isActive({ textAlign: 'left' }) && styles.active,
            )}
          >
            <TextAlignLeftIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={clsx(
              styles.menuButton,
              editor.isActive({ textAlign: 'center' }) && styles.active,
            )}
          >
            <TextAlignCenterIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={clsx(
              styles.menuButton,
              editor.isActive({ textAlign: 'right' }) && styles.active,
            )}
          >
            <TextAlignRightIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={clsx(
              styles.menuButton,
              editor.isActive({ textAlign: 'justify' }) && styles.active,
            )}
          >
            <TextAlignJustifyIcon />
          </button>
        </li>
      </ul>
    </li>

    <hr />

    {/* List */}
    <li>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx(
          styles.menuButton,
          editor.isActive('bulletList') && styles.active,
        )}
      >
        <ListBulletIcon />
      </button>
    </li>

    <hr />

    {/* Etc. */}
    <li>
      <ul className={styles.menuGroup}>
        <li>
          <button
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href
              // TODO: Use a custom dialog
              const url = window.prompt('URL', previousUrl)

              // cancelled
              if (url === null) {
                return
              }

              // empty
              if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                return
              }

              // update link
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run()
            }}
            className={clsx(
              styles.menuButton,
              editor.isActive('link') && styles.active,
            )}
          >
            <Link2Icon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={clsx(
              styles.menuButton,
              editor.isActive('codeBlock') && styles.active,
            )}
          >
            <CodeIcon />
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={clsx(
              styles.menuButton,
              editor.isActive('blockquote') && styles.active,
            )}
          >
            <QuoteIcon />
          </button>
        </li>
      </ul>
    </li>
  </ul>
)
