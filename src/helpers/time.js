import { dayStart } from "@formkit/tempo"


export const Time = {
    generateDate: (value) => {
        return dayStart(value)
    },
    getDateString: (date) => {
        const options = date.includes('00:00.000Z')
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString("es-ES", options);
    }
}