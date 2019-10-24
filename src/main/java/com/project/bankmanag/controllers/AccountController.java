package com.project.bankmanag.controllers;

import java.util.List;

import javax.validation.Valid;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bankmanag.exceptions.account.AccountNotFoundException;
import com.project.bankmanag.models.Account;
import com.project.bankmanag.services.account.AccountService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/accounts")
public class AccountController {
	private AccountService accountService;

	@Autowired
	public void setAccountService(AccountService accountService) {
		this.accountService = accountService;
	}

	@GetMapping
	@ApiOperation("Find all Accounts")
	@ApiResponses(value = @ApiResponse(code = 200, message = "List of accounts received successfully"))
	List<Account> findAll() {
		return accountService.getAll();
	}

	@PostMapping
	@ApiOperation("Add new Account")
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Account created successfully"),
			@ApiResponse(code = 409, message = "An account already exists with same IBAN"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	ResponseEntity<Object> newAccount(@RequestBody @Valid Account newAccount) {
		Long accountId = accountService.addAccount(newAccount).getId();
		if (accountId.equals(null)) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} else {
			JSONObject accObj = new JSONObject();
			accObj.put("id", accountId);
			return new ResponseEntity<>(accObj.toJSONString(), HttpStatus.CREATED);
		}
	}

	@GetMapping("{accountId}")
	@ApiOperation("Find Account by Id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Account found"),
			@ApiResponse(code = 404, message = "Could not find account") })
	Account getAccountById(@PathVariable Long accountId) {
		return accountService.getAccountById(accountId);
	}

	@PutMapping("{accountId}")
	@ApiOperation("Update Account")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Account updated successfully"),
			@ApiResponse(code = 404, message = "Could not find account to update"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	Account updateAccount(@RequestBody @Valid Account newAccount, @PathVariable Long accountId) {
		return accountService.updateAccount(newAccount, accountId);
	}

	@DeleteMapping("{accountId}")
	@ApiOperation("Delete Account by Id")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "Account deleted successfully"),
			@ApiResponse(code = 404, message = "Could not find account to delete") })
	ResponseEntity<Object> removeAccount(@PathVariable Long accountId) {
		if (!getAccountById(accountId).equals(null)) {
			accountService.deleteAccount(accountId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else
			throw new AccountNotFoundException(accountId);
	}
}
