import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';

import { DateTime } from 'luxon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles';
import { deleteFromLogAction } from '../../actions/timer';

class Log extends PureComponent {

    destroy = (id) => {
        return () => {
            const { deleteFromLog } = this.props;
            deleteFromLog(id);
        }
    };

    render() {
        const { classes, list } = this.props;

        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>№</TableCell>
                            <TableCell align='center'>Task</TableCell>
                            <TableCell align='center'>Time Start</TableCell>
                            <TableCell align='center'>Time End</TableCell>
                            <TableCell align='center'>Time Spend</TableCell>
                            <TableCell align='center'>Info</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { list.map(row => (
                            <TableRow className={classes.logRow} key={row.id}>
                                <TableCell className={classes.logCell}>{row.id}</TableCell>
                                <TableCell className={classes.logCell}>{row.name}</TableCell>
                                <TableCell className={classes.logCell}>{DateTime.fromISO(row.start).toFormat('HH:mm:ss')}</TableCell>
                                <TableCell className={classes.logCell}>{DateTime.fromISO(row.end).toFormat('HH:mm:ss')}</TableCell>
                                <TableCell className={classes.logCell}>{DateTime.fromObject(row.duration).toFormat('HH:mm:ss')}</TableCell>
                                <TableCell className={classes.logCell}>
                                    <Button
                                        className={classes.button}
                                        variant='contained'
                                        component={Link}
                                        to={`/tasks/${row.id}`}
                                    >
                                        Info
                                    </Button>
                                </TableCell>
                                <TableCell align='center'><Button className={classes.button} variant='contained' size='small' onClick={this.destroy(row.id)}>Delete</Button></TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }

} export default connect(
    (state) => ({
        list: state.timer.list,
    }),
    (dispatch) => ({
        deleteFromLog: (item) => dispatch(deleteFromLogAction(item)),
    }))(withStyles(styles)(Log));
