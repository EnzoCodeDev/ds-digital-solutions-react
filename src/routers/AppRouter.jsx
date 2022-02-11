import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoute } from "./routerPermission/PrivateRoute";
import { PublicRoute } from "./routerPermission/PublicRoute";
import { startChecking } from "../redux/actions/auth";
import { AuthRouter } from "./AuthRouter";
// import { CalendarScreen } from "../components/calendary/CalendarScreen";
import { Intro } from "../components/intro/Intro";
import { ProfileView } from "../components/Profile/ProfileView";
import { RolesScreen } from "../components/Roles-Permisos/RolesScreen";
import { RoleScreenCreate } from "../components/Roles-Permisos/RoleScreenCreate";
import { ParametrizacionDocumentMasterTable } from "../components/parametrizacion/parametrizacion/ParametrizacionDocumentMasterTable";
import { ParametrizacionDocumentMasterForm } from "../components/parametrizacion/parametrizacion/ParametrizacionDocumentMasterForm";
import { ProcesosTabla } from "../components/parametrizacion/procesos/ProcesosTabla";
import { ProcesosScreen } from "../components/parametrizacion/procesos/ProcesosScreen";
import { SubProcesosTabla } from "../components/parametrizacion/subProcesos/SubProcesosTabla";
import { SubProcesosScreen } from "../components/parametrizacion/subProcesos/SubProcesosScreen";
import { DocumentMasterIndex } from "../components/Datos/documentMaster/DocumentMasterIndex";
import { DocumentMasterView } from "../components/Datos/documentMaster/DocumentMasterView";
import { DocumentMasterDeliView } from "../components/Datos/documentMaster/DocumentMasterDeliView";
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
          {/* autenticacion */}
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticaded={checking}
          />
          {/* <PrivateRoute
            exact
            path="/calendar"
            component={CalendarScreen}
            isAuthenticaded={checking}
          /> */}
          {/* popol */}
          {/*
          *
          RUTAS DEL POPOL
          *
        */}
        {/* vista a cambio de idioma */}
          <PrivateRoute
            exact
            path="/translate"
            component={TranslateScreen}
            isAuthenticaded={checking}
          />
          {/* vista a configuracion del perfil del usuario */}
          <PrivateRoute
            exact
            path="/profile/:uuid"
            component={ProfileView}
            isAuthenticaded={checking}
          />
          {/* Vista de roles  */}
          <PrivateRoute
            exact
            path="/roles"
            component={RolesScreen}
            isAuthenticaded={checking}
          />
          {/* Crear un role */}
          <PrivateRoute
            exact
            path="/roles/create"
            component={RoleScreenCreate}
            isAuthenticaded={checking}
          />
          {/* Editar un role */}
          <PrivateRoute
            exact
            path="/roles/:uuid"
            component={RoleScreenCreate}
            isAuthenticaded={checking}
          />
          {/* HomePage */}
          <PrivateRoute
            exact
            path="/intro"
            component={Intro}
            isAuthenticaded={checking}
          />
          {/* Parametrizacion */}
          {/*
          *
          Rutas de proceso
          *
        */}
          {/* vista Tabla  */}
          <PrivateRoute
            exact
            path="/procesos"
            component={ProcesosTabla}
            isAuthenticaded={checking}
          />
          {/* vista crear */}
          <PrivateRoute
            exact
            path="/procesosCreate"
            component={ProcesosScreen}
            isAuthenticaded={checking}
          />
          {/* vista editar */}
          <PrivateRoute
            exact
            path="/procesosEdit/:uuid"
            component={ProcesosScreen}
            isAuthenticaded={checking}
          />
          {/*
          *
          Rutas de subProceso
          *
        */}
          {/* vista tabla */}
          <PrivateRoute
            exact
            path="/subProcesos"
            component={SubProcesosTabla}
            isAuthenticaded={checking}
          />
          {/* vista crear */}
          <PrivateRoute
            exact
            path="/subProcesosCreate"
            component={SubProcesosScreen}
            isAuthenticaded={checking}
          />
          {/* vista editar */}
          <PrivateRoute
            exact
            path="/SubprocesosEdit/:uuid"
            component={SubProcesosScreen}
            isAuthenticaded={checking}
          />
          {/*
          *
          Rutas de parametrizacion
          *
        */}
          {/* vista tabla */}
          <PrivateRoute
            exact
            path="/documentation-master-list"
            component={ParametrizacionDocumentMasterTable}
            isAuthenticaded={checking}
          />
          {/* vista crear documento */}
          <PrivateRoute
            exact
            path="/newDocument"
            component={ParametrizacionDocumentMasterForm}
            isAuthenticaded={checking}
          />
          {/* vista editar documento */}
          <PrivateRoute
            exact
            path="/newDocument/:uuid"
            component={ParametrizacionDocumentMasterForm}
            isAuthenticaded={checking}
          />
          {/* Datos */}
           {/*
          *
          Rutas de maestro de infroamcion
          *
        */}
        {/* Tabla documentos deligenciados */}
          <PrivateRoute
            exact
            path="/documentMaster"
            component={DocumentMasterIndex}
            isAuthenticaded={checking}
          />
          {/* vista deligenciar documento */}
          <PrivateRoute
            exact
            path="/viewDocument/:uuid"
            component={DocumentMasterView}
            isAuthenticaded={checking}
          />
          {/* vista ver documento deligenciado */}
          <PrivateRoute
            exact
            path="/viewDocumentDeli/:uuid"
            component={DocumentMasterDeliView}
            isAuthenticaded={checking}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
