export interface Account {
    id:           Number;
    amount:       Number;
    pinCode:      Number;
    currencyName: String;
    accountName:  String;
    client:       Client;
    iban:         String;
}

export interface Client {
    id:        number;
    firstName: string;
    lastName:  string;
    cnp:       string;
    poB:       string;
    doB:       Date;
}