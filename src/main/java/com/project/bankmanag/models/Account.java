package com.project.bankmanag.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;

enum CurrencyType {
	EURO(0.859382032), POUNDS(1.16362684);

	private double exchangeRate;

	private CurrencyType(double exchangeRate) {
		this.exchangeRate = exchangeRate;
	}

	public double getExchangeRate() {
		return this.exchangeRate;
	}
}

@Entity
public class Account {
	@Column(name = "account_id")
	@ApiModelProperty(required = false, hidden = true)
	private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;
	@NotNull(message = "Please provide an amount")
	private BigDecimal amount;
	@NotNull(message = "Please provide an IBAN")
	private @Column(unique = true) String IBAN;
	@NotNull(message = "Please provide a pincode")
	private @Column(name = "pin_code") int pinCode;
	@NotNull(message = "Please provide a currencyName")
	@Enumerated(EnumType.STRING)
	private @Column(name = "currency_name") CurrencyType currencyName;
	@NotNull(message = "Please provide an account name")
	private @Column(name = "account_name") String accountName;
	@OneToMany(cascade = CascadeType.ALL)
	private List<Transaction> transactions = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getIBAN() {
		return IBAN;
	}

	public void setIBAN(String iBAN) {
		IBAN = iBAN;
	}

	public int getPinCode() {
		return pinCode;
	}

	public void setPinCode(int pinCode) {
		this.pinCode = pinCode;
	}

	public CurrencyType getCurrencyName() {
		return currencyName;
	}

	public void setCurrencyName(CurrencyType currencyName) {
		this.currencyName = currencyName;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public void populate(BigDecimal amount, String iban, int pinCode, CurrencyType currencyName, String accountName) {
		this.amount = amount;
		this.IBAN = iban;
		this.pinCode = pinCode;
		this.currencyName = currencyName;
		this.accountName = accountName;
	}

}
