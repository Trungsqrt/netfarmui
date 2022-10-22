import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main/Main';
import Shop from './Shop/Shop';
function Routes(props) {
    return (
        <Switch>
            <Route path="/shop/main" exact component={Main} />
            <Route path="/shop/shop" exact component={Shop} />
        </Switch>
    );
}

export default Routes;
