import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2, 0),
    },
  }),
)

interface LoaderProps {
  show: boolean
}

export const Loader: React.FunctionComponent<LoaderProps> = (props) => {
  const classes = useStyles(props)
  const { show } = props

  if (!show) {
    return null
  }

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
