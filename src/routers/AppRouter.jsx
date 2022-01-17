import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoute } from "./routerPermission/PrivateRoute";
import { PublicRoute } from "./routerPermission/PublicRoute";
import { AuthRouter } from "./AuthRouter";
import { startChecking } from "../redux/actions/auth";
import { CalendarScreen } from "../components/calendary/CalendarScreen";
import { Intro } from "../components/intro/Intro";
import { DocumentMasterExecutionTable } from '../components/documentMasterExecution/documentMasterExecutionTable';
import { DocumentMasterExecutionFill } from '../components/documentMasterExecution/DocumentMasterExecutionFill';
import { ParametrizacionDocumentMasterTable } from "../components/parametrizacion/ParametrizacionDocumentMasterTable";
import { ParametrizacionDocumentMasterForm } from "../components/parametrizacion/ParametrizacionDocumentMasterForm";
import { DocumentMasterIndex } from "../components/documentMaster/DocumentMasterIndex";
import { DocumentMasterView } from "../components/documentMaster/DocumentMasterView";
import { TranslateScreen } from "../components/translate/TranslateScreen";
export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  //Rutas de nuestra aplicacion privadas y publicas
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/calendar"
            component={CalendarScreen}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/intro"
            component={Intro}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/documentation-master-list"
            component={ParametrizacionDocumentMasterTable}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/newDocument/:uuid"
            component={ParametrizacionDocumentMasterForm}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/newDocument"
            component={ParametrizacionDocumentMasterForm}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/documentMasterExecutionTable"
            component={DocumentMasterExecutionTable}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/documentMasterExecutionTable/:uuid"
            component={DocumentMasterExecutionFill}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/translate"
            component={TranslateScreen}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/documentMaster"
            component={DocumentMasterIndex}
            isAuthenticaded={checking}
          />
          <PrivateRoute
            exact
            path="/viewDocument/:uuid"
            component={DocumentMasterView}
            isAuthenticaded={checking}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
