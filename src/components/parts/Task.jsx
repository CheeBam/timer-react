import React, {Component} from 'react';
import { connect } from 'react-redux';

import { DateTime } from 'luxon';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles';
import Timer from './Timer';
import MyDialog from './Dialog';
import { setNameAction, addLogAction, createItemAction } from '../../actions/timer';
import { getNextId } from '../../helpers';

class Task extends Component {

    constructor(props) {
        super();
        const { timer: { item } } = props;

        if (item && item.id !== 0) {
            const diffInMillis = DateTime.fromISO(item.start).diffNow('millisecond');
            this.state = {
                started: true,
                duration: Math.abs(diffInMillis.valueOf()),
                name: item.name,
                dialog: false,
            }
        }
    }

    state = {
        name: '',
        started: false,
        duration: 0,
        dialog: false,
    };

    onChangeName = (e) => {
        const { changeName } = this.props;

        this.setState({
            name: e.target.value,
        });

        changeName(e.target.value);
    };

    onStartClick = () => {
        const { name } = this.state;
        const { createItem } = this.props;

        this.setState({
            started: true,
        });

        const item = {
            id: getNextId(),
            start: DateTime.local().toISO(),
            name,
            end: null,
            duration: null,
        };

        createItem(item);
    };

    onStopClick = () => {
        const { name } = this.state;
        const { addToLog, timer: { item } } = this.props;

        if (!name) {
            this.openDialog();
        } else {

            this.setState({
                started: false,
                name: '',
            });

            const end = DateTime.local();
            const timer = {
                id: item.id,
                name,
                start: item.start,
                end: end.toISO(),
                duration: end.diff(DateTime.fromISO(item.start), ['hours', 'minutes', 'seconds']).toObject(),
            };

            addToLog(timer);
        }
    };

    closeDialog = () => {
        return () => {
            this.setState({dialog: false});
        }
    };

    openDialog = () => {
        this.setState({dialog: true});
    };

    renderButton = (started) => {
        const { classes } = this.props;

        return (
            <Button className={classes.button} variant='contained' size='small' onClick={started ? this.onStopClick : this.onStartClick}>
                { started ? 'Stop' : 'Start' }
            </Button>
        );
    };

    render() {
        const { started, duration, name, dialog } = this.state;
        const { classes } = this.props;

        return (
            <Grid container spacing={8} justify={'center'} className={classes.taskWrapper}>
                <Grid item xs={12}>
                    <MyDialog open={dialog} closeDialog={this.closeDialog}/>
                </Grid>
                <Grid item xs={12}>
                    <Input className="taskInput" value={name} name={'timerName'} onChange={this.onChangeName}/>
                </Grid>
                <Grid item xs={12}>
                    <Timer started={started} duration={duration}/>
                </Grid>
                <Grid item xs={12}>
                    { this.renderButton(started) }
                </Grid>
            </Grid>
        );
    }
}

export default connect(
    (state) => ({
        timer: state.timer,
    }),
    (dispatch) => ({
        changeName: (name) => dispatch(setNameAction(name)),
        addToLog: (item) => dispatch(addLogAction(item)),
        createItem: (item) => dispatch(createItemAction(item)),
    }))(withStyles(styles)(Task));
