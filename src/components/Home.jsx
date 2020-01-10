import React , {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuBar from './Menubar';
import { connect } from 'react-redux';
import { ADD_TODO, COMPLETE_TODO , DELETE_TODO} from '../store/action';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
    margin: theme.spacing(3 , 0 , 0 ,0),
  },
  formControl: {
    margin: theme.spacing(3,1 , 1 , 1),
    width : '75%'
  }
}));

function Home(props) {
  // const [labelWidth, setLabelWidth] = React.useState(0);
  const [name, setName] = React.useState('Add Task');
  const [state, setState] = React.useState([]);
  const labelRef = React.useRef(null);
  const classes = useStyles();

  useEffect(() => {
    // setState([props.getTodo({type : GET_TODO})]);
    setState(props.Todos)
    console.log('useEffect update' , props.Todos)
  }, [props.Todos]);

  function handleChange(event) {
    setName(event.target.value);
    
  }

  function AddTodo() {
    if(name === '' || name === 'Add Task' ) {
      alert('Please enter value');
      return;
    }
    const action = {type : ADD_TODO ,  todo : name , complete : false , delete : false}
    props.Add(action)
    setState(props.Todos)
    // setName('Add Task')
  }
  function deleteTodo(id) {
    console.log(id)
    const action = {type : DELETE_TODO , id : id}
    props.delete(action)
    // setName('Add Task')
  }
  function completeTodo(id) {
    console.log(id)
    const action = {type : COMPLETE_TODO , id : id}
    props.Complete(action)
    // setName('Add Task')
  }

  return (
    <div>
      <Paper className={classes.root}>
          <Box width="100%">
               <FormControl className={classes.formControl} variant="outlined">
        <InputLabel ref={labelRef} htmlFor="component-outlined">
          Add
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={name}
          onChange={handleChange}
        />
      </FormControl>  
          <Fab color="primary" aria-label="add" onClick={AddTodo} className={classes.fab}>
        <AddIcon />
      </Fab>
          </Box>
      </Paper>
      <MenuBar delete={deleteTodo} complete={completeTodo} data={state} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {Todos : state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    Add: (action) => dispatch(action),
    Complete : (action) => dispatch(action),
    delete : (action) => dispatch(action),
}
}

export default connect(mapStateToProps , mapDispatchToProps)(Home)