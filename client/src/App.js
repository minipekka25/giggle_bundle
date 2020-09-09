import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home2 from './components/Home2'
import Direct from './components/Direct'
import editor from './components/editor'
import Orgexplorer from "./components/Orgexplorer"
import Organisation from "./components/Organisation"
import Workredirector from "./components/Workredirector"
import Getstarted from './components/Getstarted';
import Createworkspace from './components/Createworkspace';
import Createchannelonboard from './components/Createchannelonboard';
import Joinworkspaceonboard from './components/Joinworkspaceonboard';
import Searchorgs from './components/Searchorgs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home2} />
          <Route path="/edit" exact component={editor} />
          <Route path="/orgexplorer" exact component={Orgexplorer} />
          <Route path="/getstarted" exact component={Getstarted} />
          <Route path="/joinorg/search/:ws_id" exact component={Searchorgs} />
          <Route path="/create/workspace" exact component={Createworkspace} />
          <Route path="/create/channel/:ws_id" exact component={Createchannelonboard} />
          <Route path="/join/workspace/onboard/:ws_id" exact component={Joinworkspaceonboard} />
          <Route path="/workspace/redirect/:ws_id" exact component={Workredirector} />
          <Route path="/app/organisation" exact component={Organisation} />
          <Route path="/app/:ws_id/channel/:ch_id" exact component={Home2} />
          <Route path="/app/:ws_id/direct/:dm_id" exact component={Direct} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
