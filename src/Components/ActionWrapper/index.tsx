import React, { ReactElement } from 'react'

interface ActionWrapperProps {
  children: Array<React.ReactElement> | React.ReactElement
}

function ActionWrapper({ children }: ActionWrapperProps): ReactElement {
  return (
    <div className="flex justify-center gap-x-2">
      {children}
    </div>
  )
}

export default ActionWrapper
