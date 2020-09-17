export interface Transaction {
    id:         number;
    amount:     number;
    date:       Date;
    type:       string;
    account:    Account;
}

export interface Account {
    id:           number;
    amount:       number;
    pinCode:      number;
    currencyName: string;
    accountName:  string;
    client_id:    number;
    iban:         string;
}
