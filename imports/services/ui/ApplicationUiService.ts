import * as React from 'react'

type Actions = {
  [key: string]: Function
}

type Actions = Record<string, Function>

interface ActionsContext<U> {
  ActionsContext: React.Context<U>
  useActions: () => U
}

export const ApplicationUiService = {
  createActionsContext<T extends Actions>(
    displayNamePrefix: string,
  ): ActionsContext<T> {
    if (!displayNamePrefix) {
      throw new Error('Prefix for display name is required.')
    }

    const ActionsContext = React.createContext<T>({} as T)
    ActionsContext.displayName = `${displayNamePrefix}ActionsContext`
    return {
      ActionsContext,
      useActions(): T {
        return React.useContext<T>(ActionsContext)
      },
    }
  },
}
Object.freeze(ApplicationUiService)
