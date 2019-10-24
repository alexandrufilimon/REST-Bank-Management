package com.project.bankmanag.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Type {
	@Column(name = "transaction_type")
	@ApiModelProperty(required = false, hidden = true)
	private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;
	@NotNull(message = "Please provide a name")
	@Column(unique = true)
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
