import { IconButton } from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import * as React from 'react'

interface ActiveTaskActionsProps {
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
  onArchive: () => void
  onDiscard: () => void
}

export const ActiveTaskActions: React.FunctionComponent<
  ActiveTaskActionsProps
> = (props) => {
  const { isEditing, onArchive, onCancelEdit, onDiscard, onEdit } = props

  function handleClickArchive(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    onArchive()
  }

  function handleClickCancelEdit(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    onCancelEdit()
  }

  function handleClickDiscard(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    onDiscard()
  }

  function handleClickEdit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    onEdit()
  }

  return (
    <>
      {isEditing ? (
        <IconButton onClick={handleClickCancelEdit}>
          <CancelIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleClickEdit}>
          <EditIcon />
        </IconButton>
      )}
      <IconButton disabled={isEditing} onClick={handleClickArchive}>
        <ArchiveIcon />
      </IconButton>
      <IconButton disabled={isEditing} onClick={handleClickDiscard}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}
