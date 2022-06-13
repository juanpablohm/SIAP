export var Agreement = {
    type: "Marco",
    observations: "",
    name: "",
    supervisorName: "",
    extension: "",
    term: "Fija",
    endDate: (new Date()).toISOString(),
    startDate: (new Date()).toISOString(),
    date: (new Date()).toISOString(),
    status: 0,
    object: "",
    secop: "",
    registeredNumber: "",
    liquidation: "",
    amount: 0,
    petitioner: ""
};

export function enumType(status){
    switch (status) {
        case 1:
            return "Activo";
        default:
            return "Finalizado";
    }
};