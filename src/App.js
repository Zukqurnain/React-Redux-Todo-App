import React from 'react';
import './App.css';

import ButtonAppBar from './components/Appbar';
import Home from './components/Home';

class App extends React.Component {
  render() {
    // console.log(this.state.Todos)
    return (
      <div className="App">
      <div>
      <ButtonAppBar/>
      <Home />
      </div>
    </div>
    )
    }
};

export default App;