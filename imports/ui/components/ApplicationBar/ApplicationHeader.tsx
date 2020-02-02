import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../ApplicationActions';

const useStyles = makeStyles(() =>
  createStyles({
    spacer: {
      flexGrow: 1,
    },
  }),
);

interface ApplicationHeaderProps {
  isAuthenticated: boolean;
  username: string;
}

export const ApplicationHeader: React.FunctionComponent<
  ApplicationHeaderProps
> = (props) => {
  const { isAuthenticated, username } = props;
  const { signOutAction } = useActions();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  function handleMenu(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setAnchorEl(null);
  }

  function handleClickChangePassword(
    event: React.MouseEvent<HTMLLIElement>,
  ): void {
    event.preventDefault();
    setAnchorEl(null);
    history.push('/changepassword');
  }

  function handleFulfilled(): void {
    history.push('/signin');
  }

  function handleRejected(error: Meteor.Error): void {
    console.error(error.reason);
  }

  async function handleClickSignOut(
    event: React.MouseEvent<HTMLLIElement>,
  ): Promise<void> {
    event.preventDefault();
    setAnchorEl(null);
    try {
      await signOutAction();
      handleFulfilled();
    } catch (exception) {
      handleRejected(exception);
    }
  }

  const classes = useStyles(props);
  return (
    <AppBar position={'relative'}>
      <Toolbar>
        <Typography component={'h1'} variant={'h5'}>
          Domain-Driven Design with Meteor
        </Typography>
        <div className={classes.spacer} />
        {isAuthenticated ? (
          <>
            <Button
              aria-label={'account of current user'}
              aria-controls={'menu-appbar'}
              aria-haspopup={'true'}
              color={'inherit'}
              endIcon={<AccountCircle />}
              onClick={handleMenu}
            >
              {username}
            </Button>
            <Menu
              keepMounted
              id={'menu-appbar'}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickChangePassword}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleClickSignOut}>Sign out</MenuItem>
            </Menu>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
