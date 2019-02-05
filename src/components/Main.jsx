import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles';
import Task from './parts/Task';
import Log from './parts/Log';
import Chart from './parts/Chart';

const getCurrentTab = props => {
  const {
    match: {
      params: { tab = 'log' },
    },
  } = props;
  return tab;
};

const renderTab = tab => {
  switch (tab) {
    case 'log':
      return <Log />;
    case 'chart':
      return <Chart />;
    default:
      return '';
  }
};

const Main = props => {
  const { classes } = props;
  const tab = getCurrentTab(props);
  return (
    <Fragment>
      <Task />
      <Grid
        container
        spacing={8}
        justify="center"
        className={classes.mainContainer}
      >
        <Grid item lg={1} />
        <Grid item lg={9} md={12} xs={12}>
          <Tabs value={tab} className={classes.mainTabList} variant="fullWidth">
            <Tab
              className={classes.mainTab}
              label="Tasks log"
              value="log"
              component={Link}
              to="/log"
            />
            <Tab
              className={classes.mainTab}
              label="Tasks chart"
              value="chart"
              component={Link}
              to="/chart"
            />
          </Tabs>
          {renderTab(tab)}
        </Grid>
        <Grid item lg={1} />
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(Main);
