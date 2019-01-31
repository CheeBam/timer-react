import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles';

class NotFound extends PureComponent {
    render() {
        const { classes } = this.props;

        return (
            <div align='center'>
                <h2>404 - Not found</h2>

                <Button
                    className={classes.button}
                    variant='contained'
                    component={Link}
                    to={'/log'}
                >
                    Back
                </Button>
            </div>
        );
    }
}
export default withStyles(styles)(NotFound);
