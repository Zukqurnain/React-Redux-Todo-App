import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DoneIcon from '@material-ui/icons/Done';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  font : {
    fontSize : 24
  }
}));

export default class Todo extends React.Component {

  state = {
    unComplete : [],
    Complete : [],
    Delete : [],
    action : ''
  }

  componentDidMount(){
    const unComplete = this.props.todos.filter(x => x.complete == false && x.delete == false);
    const Complete = this.props.todos.filter(x => x.complete === true && x.delete == false);
    const Delete = this.props.todos.filter(x => x.delete === true && x.complete == false)
    this.setState({unComplete , Complete , Delete , action : this.props.status})
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.todos !== this.props.todos || this.props.status !== nextProps.status){
      console.log("nextnextProps " , nextProps)
      const unComplete = nextProps.todos.filter(x => x.complete == false && x.delete == false);
      const Complete = nextProps.todos.filter(x => x.complete === true && x.delete == false);
      const Delete = nextProps.todos.filter(x => x.delete === true && x.complete == false)
      this.setState({unComplete , Complete , Delete , action : nextProps.status})
      setTimeout(() => {
        this.setState()
      }, 1000)
    }
  }
  
  handleTodo = (classes) => {
      switch(this.state.action) {
        case 'active':
         return this.state.unComplete.map(value => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem key={value + Math.random()} role={undefined}>
              <ListItemIcon>
              <AssignmentIcon />
              </ListItemIcon>
              <ListItemText className={classes.font} id={labelId} primary={value.todo} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => this.props.complete(value.id)}>
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={() => this.props.delete(value.id)} >
                  <DeleteOutlineIcon onChange={() => this.props.delete(value.id)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
          break;
        case 'complete':
            return this.state.Complete.map(value => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={value + Math.random()} role={undefined}>
                  <ListItemIcon>
                  <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.font} id={labelId} primary={value.todo} />
                </ListItem>
              );
            })
          break;
        case 'delete':
            return this.state.Delete.map(value => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={value + Math.random()} role={undefined}>
                  <ListItemIcon>
                  <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.font} id={labelId} primary={value.todo} />
                </ListItem>
              );
            })
          break;
        default:
            return this.state.unComplete.map(value => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={value + Math.random()} role={undefined}>
                  <ListItemIcon>
                  <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.font} id={labelId} primary={value.todo} />
                  <ListItemSecondaryAction>
                    <IconButton >
                      <DoneIcon onChange={() => this.props.complete(value.id)} />
                    </IconButton>
                    <IconButton >
                      <DeleteOutlineIcon onChange={() => this.props.delete(value.id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
              break;
      }
  }


  render() {
    const classes = {}
    const unComplete = this.props.todos.filter(x => x.complete == false && x.delete == false);
    const Complete = this.props.todos.filter(x => x.complete === true && x.delete == false);
    const Delete = this.props.todos.filter(x => x.delete === true && x.complete == false)
    return (
    <List className={classes.root}>
      {this.handleTodo(classes)}
    </List>
  )}
}