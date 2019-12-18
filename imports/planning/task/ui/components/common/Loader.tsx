import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

export const Loader: React.FunctionComponent = (props) => {
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
