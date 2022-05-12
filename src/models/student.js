
export var Student = {
    firstName : '',
    lastName: '',
    documentId: '',
    dateBirth: '2014-08-18T21:11:54',
    cellphone: '',
    email: '',
    eps: 'Sura',
    university: '',
    faculty: '',
    program: '',
    code: '',
};

export function enumEPS(eps){
    switch (eps) {
        case 1:
            return "Sanitas";
        default:
            return "Sin eps";
    }
};