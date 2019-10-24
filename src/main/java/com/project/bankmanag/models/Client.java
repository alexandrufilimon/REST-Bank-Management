package com.project.bankmanag.models;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Client {
	@Column(name = "client_id")
	@ApiModelProperty(required = false, hidden = true)
	private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long clientId;
	@NotNull(message = "Please provide a firstName")
	private @Column(name = "first_name") String firstName;
	@NotNull(message = "Please provide a lastName")
	private @Column(name = "last_name") String lastName;
	@NotNull(message = "Please provide a CNP")
	private @Column(unique = true) String cnp;
	@NotNull(message = "Please provide a date of birth")
	private @Column(name = "date_of_birth") Date DoB;
	@NotNull(message = "Please provide a place of birth")
	private @Column(name = "location_of_birth") String PoB;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Account> accounts = new ArrayList<>();

	public Client() {
	}

	public Client(Long clientId, String firstName, String lastName, String cnp, Date doB, String poB) {
		super();
		this.clientId = clientId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.cnp = cnp;
		this.DoB = doB;
		this.PoB = poB;
	}

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCnp() {
		return cnp;
	}

	public void setCnp(String cnp) {
		this.cnp = cnp;
	}

	public Date getDoB() {
		return DoB;
	}

	public void setDoB(Date doB) {
		DoB = doB;
	}

	public String getPoB() {
		return PoB;
	}

	public void setPoB(String poB) {
		PoB = poB;
	}

	public void populate(String firstName, String lastName, String cnp, String pob, Date dob) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.cnp = cnp;
		this.PoB = pob;
		this.DoB = dob;
	}

}
