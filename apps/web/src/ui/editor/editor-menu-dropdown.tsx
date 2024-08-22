import { ChevronDownIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import styles from './editor-menu-dropdown.module.css'

const EditorMenuDropdownContext = createContext<{
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}>({
  isExpanded: false,
  setIsExpanded: () => {},
})

export const EditorMenuDropdown: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <EditorMenuDropdownContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </EditorMenuDropdownContext.Provider>
  )
}

export const EditorMenuDropdownTrigger: React.FC<{
  children: ReactNode
  className?: string
}> = ({ children, className }) => {
  const { isExpanded, setIsExpanded } = useContext(EditorMenuDropdownContext)

  return (
    <button
      onClick={() => setIsExpanded((curr) => !curr)}
      onBlur={() => setIsExpanded(false)}
      aria-expanded={isExpanded}
      className={clsx(styles.dropdownTrigger, className)}
    >
      {children}
      <ChevronDownIcon className={styles.dropdownChevron} />
    </button>
  )
}

export const EditorMenuDropdownList: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ul className={styles.dropdownList}>{children}</ul>

export const EditorMenuDropdownItem: React.FC<{
  onClick: () => void
  children: ReactNode
  isActive?: boolean
  disabled?: boolean
}> = ({ onClick, isActive = true, disabled, children }) => {
  const { setIsExpanded } = useContext(EditorMenuDropdownContext)

  return (
    <li>
      <button
        onClick={() => {
          onClick()
          setIsExpanded(false)
        }}
        onMouseDown={(event) => event.preventDefault()}
        disabled={disabled}
        className={clsx(
          styles.dropdownItem,
          isActive && styles.dropdownItemActive,
        )}
      >
        {children}
      </button>
    </li>
  )
}
