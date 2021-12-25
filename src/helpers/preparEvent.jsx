//Este helper es para manejar el formato de calendario
//ya que es un string para manejar con moment
import moment from 'moment'
export const prepareEvents = ( events = [] ) => {
    return events.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate(),
        })
    );

}