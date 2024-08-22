import { type Extension, NodeViewContent, NodeViewWrapper } from '@tiptap/react'

import styles from './code-block.module.css'

type CodeBlockProps = {
  node: {
    attrs: { language: string }
  }
  updateAttributes: (params: { language: string }) => void
  extension: Extension
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) => (
  <NodeViewWrapper className={styles.codeBlock}>
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={(event) => updateAttributes({ language: event.target.value })}
      className={styles.select}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang: string) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre spellCheck={false}>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)
