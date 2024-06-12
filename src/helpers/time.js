import { dayStart, format } from "@formkit/tempo"


export const Time = {
    generateDate: (value) => {
        return dayStart(value)
    },
    generateDatefromTime: (time) => {
        const [hours, minutes] = time.split(":");
        return new Date(new Date().setHours(hours, minutes))
    },
    getFormatedDate: (date) => {
        return format(new Date(date), "YYYY-MM-DDTHH:mm:ss");
    },
    getTimeFromDate:(date)=>{
        return format(new Date(date),"hh:mm","eu-EU")
    },
    getDateString: (date) => {
        const options = date.includes('00:00.000Z')
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString("es-ES", options);
    }
}