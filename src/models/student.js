
export var Student = {
    firstName : '',
    lastName: '',
    cedula: '',
    dateBirth: '2014-08-18T21:11:54',
    phone: '',
    email: '',
    eps: '',
    universityId: '',
    faculty: '',
    program: '',
    codigo: '',
    type: '0',
};

export function enumEPS(eps){
    switch (eps) {
        case 0:
            return "Sura";
        case 1:
            return "Sanitas";
        case 2:
            return "Cafesalud";
        case 3:
            return "SaludTotal";
        default:
            return "Sin eps";
    }
};
