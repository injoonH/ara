'use client'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { common, createLowlight } from 'lowlight'

import { CodeBlock } from './code-block'
import { EditorMenu } from './editor-menu'
import styles from './editor.module.css'

const lowlight = createLowlight(common)

export const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https', 'mailto', 'tel', 'ftp'],
      }),
      CodeBlockLowlight.extend({
        addNodeView: () => ReactNodeViewRenderer(CodeBlock),
      }).configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class: styles.editor || '',
      },
    },
    immediatelyRender: false,
    content: `
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <p>This is a basic example of Tiptap.</p>
    <ul>
      <li>
        Bold
      </li>
      <li>
        Italic
      </li>
      <li>
        Underline
      </li>
      <li>
        Strike
      </li>
      <li>
        Link
      </li>
      <li>
        Heading
      </li>
      <li>
        Paragraph
      </li>
      <li>
        Bullet list
      </li>
      <li>
        Code block
      </li>
      <li>
        Text color
      </li>
      <li>
        Text background color
      </li>
      <li>
        Font size
      </li>
      <li>
        Font family
      </li>
    </ul>
    `,
  })

  if (!editor) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
