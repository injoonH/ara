import { type ReactNode, useCallback, useRef, useState } from 'react'

export type DialogProps = Omit<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  'onMouseDown'
> & {
  children: ReactNode
}

export const useDialog = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const ref = useRef<HTMLDialogElement>(null)

  const open = useCallback(() => {
    if (ref.current) {
      ref.current.showModal()
      setIsOpened(true)
    }
  }, [ref])

  const close = useCallback(() => {
    if (ref.current) {
      ref.current.close()
      setIsOpened(false)
    }
  }, [ref])

  const Dialog = useCallback<React.FC<DialogProps>>(
    ({ children, ...props }) => (
      <dialog
        ref={ref}
        onMouseDown={(event) => {
          if (event.target === ref.current) {
            close()
          }
        }}
        {...props}
      >
        <div style={{ height: '100%' }}>{children}</div>
      </dialog>
    ),
    [ref, close],
  )

  return { Dialog, isOpened, open, close }
}
