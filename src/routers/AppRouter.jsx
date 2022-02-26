import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoute } from "./routerPermission/PrivateRoute";
import { PublicRoute } from "./routerPermission/PublicRoute";
import { startChecking } from "../redux/actions/auth";
import { AuthRouter } from "./AuthRouter";
// import { CalendarScreen } from "../components/calendary/CalendarScreen";
import { Dasboard } from "../components/dasboard/Dasboard";
import { ProfileView } from "../components/profile/Profile";
import { RolesTabla } from "../components/Roles-Permisos/roleTable/RolesTabla";
import { RoleForm } from "../components/Roles-Permisos/roleForm/RoleForm";
import { DocumentTable } from "../components/administracion/documentTab/documentTable/documentTable/DocumentTable";
import { DocumentForm } from "../components/administracion/documentTab/documentFormParameterization/documentForm/DocumentForm";
import { ProcesosTabla } from "../components/administracion/procesos/procesosTabla/ProcesosTabla";
import { ProcesosForm } from "../components/administracion/procesos/procesosForm/ProcesosForm";
import { SubProcesosTabla } from "../components/administracion/subProcesos/subProcesosTable/SubProcesosTabla";
import { SubProcesosForm } from "../components/administracion/subProcesos/subProcesosForm/SubProcesosForm";
import { DocumentTableDeli } from "../components/Datos/masterInformation/documentTable/documentTable/DocumentTableDeli";
import { DocumentView } from "../components/Datos/masterInformation/documentView/DocumentView";
import { DocumentFormDeli } from "../components/Datos/masterInformation/documentForm/DocumentFormDeli";
import { Translate } from "../components/translate/Translate";
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
            component={Translate}
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
            component={RolesTabla}
            isAuthenticaded={checking}
          />
          {/* Crear un role */}
          <PrivateRoute
            exact
            path="/roles/create"
            component={RoleForm}
            isAuthenticaded={checking}
          />
          {/* Editar un role */}
          <PrivateRoute
            exact
            path="/roles/:uuid"
            component={RoleForm}
            isAuthenticaded={checking}
          />
          {/* HomePage */}
          <PrivateRoute
            exact
            path="/intro"
            component={Dasboard}
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
            component={ProcesosForm}
            isAuthenticaded={checking}
          />
          {/* vista editar */}
          <PrivateRoute
            exact
            path="/procesosEdit/:uuid"
            component={ProcesosForm}
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
            component={SubProcesosForm}
            isAuthenticaded={checking}
          />
          {/* vista editar */}
          <PrivateRoute
            exact
            path="/SubprocesosEdit/:uuid"
            component={SubProcesosForm}
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
            component={DocumentTable}
            isAuthenticaded={checking}
          />
          {/* vista crear documento */}
          <PrivateRoute
            exact
            path="/newDocument"
            component={DocumentForm}
            isAuthenticaded={checking}
          />
          {/* vista editar documento */}
          <PrivateRoute
            exact
            path="/newDocument/:uuid"
            component={DocumentForm}
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
            component={DocumentTableDeli}
            isAuthenticaded={checking}
          />
          {/* vista deligenciar documento */}
          <PrivateRoute
            exact
            path="/viewDocument/:uuid"
            component={DocumentView}
            isAuthenticaded={checking}
          />
          {/* vista ver documento deligenciado */}
          <PrivateRoute
            exact
            path="/viewDocumentDeli/:uuid"
            component={DocumentFormDeli}
            isAuthenticaded={checking}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
