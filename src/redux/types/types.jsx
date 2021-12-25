export const types ={
    //Eventos de auth
    authLogin: '[auth] Login',
    authLogout: '[Auth] Logout',
    authCheckingFinish: '[auth] Finish Login State',
    authStartRegister: '[auth] Start Register', 
    authStarTokenRenew: '[auth] Start Token Renew',
    authStartLogout:'[auth] Logout',
    //Eventos del modal
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',
    //eventos calendar
    eventStartAddNew: '[event] Add new',
    eventSetActive: '[event] Set Active',
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Event loaded',
    eventLogout: '[event] Logout event',
    //Eventos del formulario para guardar, editar eliminar y actualizar
    documentDefaultDocumentMaster: '[documentMaster] Default documentMaster',
    documentViewDocumentMaster: '[documentMaster] View documentMaster',
    documentNewDocumentMaster: '[documentMaster] New documentMaster',
    documentUpdateDocumentMaster:'[documentMaster] Updated documentMaster',
    documentDeletedDocumentMaster: '[documentMaster] Deleted documentMaster',
    //Eventos de documentos para la tabla como el paginate y mas
    DocumentMasterPaginateInit:'[document] Paginate',
}