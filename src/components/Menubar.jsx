import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Todo from './todo'
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, data , ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative',
    minHeight: 200,
    top: theme.spacing(2)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

export default function MenuBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    // setState([props.getTodo({type : GET_TODO})]);
    // setState(props.data)
    console.log('useEffect MenuBar' , props.data)
    setValue(0);
  }, [props.data]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Active Todo" {...a11yProps(0)} />
          <Tab label="Delete Todo" {...a11yProps(1)} />
          <Tab label="Complete Todo" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Todo todos={props.data} delete={props.delete} complete={props.complete} status="active" />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Todo todos={props.data} delete={props.delete} complete={props.delete} status="delete" />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Todo todos={props.data} delete={props.delete} complete={props.complete} status="complete" />
        </TabPanel>

    </div>
  );
}
