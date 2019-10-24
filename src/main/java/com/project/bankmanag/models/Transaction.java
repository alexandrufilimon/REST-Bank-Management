package com.project.bankmanag.models;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Transaction {
	@Column(name = "transaction_id")
	@ApiModelProperty(required = false, hidden = true)
	private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;
	@NotNull(message = "Please provide an amount")
	private @Column(name = "transaction_amount") BigDecimal amount;
	@NotNull(message = "Please provide a date")
	private @Column(name = "transaction_date") Date date;
	// TODO: add clientId
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "transaction_type")
	// TODO: validare
	private Type type;

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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public void populate(BigDecimal amount, Date date, Type type) {
		this.amount = amount;
		this.date = date;
		this.type = type;
	}
}
