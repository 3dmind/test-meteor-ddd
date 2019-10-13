import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import * as React from 'react'

interface SectionProps {
  title: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginBottom: theme.spacing(1),
    },
  }),
)

export const Section: React.FunctionComponent<SectionProps> = (props) => {
  const { title } = props
  const classes = useStyles(props)

  return (
    <Typography component={'h2'} variant={'h5'} className={classes.section}>
      {title}
    </Typography>
  )
}
