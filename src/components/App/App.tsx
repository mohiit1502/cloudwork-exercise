import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {

  nowHandler () : number {
    return Date.now();
  }

  render() {
    return (
      <div className="app-root container mt-5 pt-5 d-flex flex-column">
        <h1 className="header">CloudWork</h1>
        <div className="d-flex flex-row-reverse mt-5">
          <div className="form-container border p-5" style={{flex: 2}}><WorkloadFormContainer /></div>
          <div className="list-container" style={{flex: 5}}>
            <h2 className="mb-3">Workloads</h2>
            <WorkloadListContainer nowHandler={this.nowHandler}/>
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
