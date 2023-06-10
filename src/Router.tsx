import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {

}

function Router({}: IRouterProps) {
    return <BrowserRouter>
        <Switch>
            <Route path="/coins">
                <Coins />
            </Route>
            <Route path="/:coinId">
                <Coin />
            </Route>
        </Switch>
    </BrowserRouter>
}

export default Router;