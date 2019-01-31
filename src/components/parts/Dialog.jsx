import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles';

class MyDialog extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
    };

    render() {
        const { open, closeDialog, classes } = this.props;

        return (
            <Dialog
                open={ open }
                onClose={ closeDialog() }
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title' disableTypography={true}><h2 className={classes.dialogTitle}>Empty task name</h2></DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You are trying close your task without name, enter the title and try again!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ closeDialog() } className={classes.dialogButton} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default withStyles(styles)(MyDialog);
