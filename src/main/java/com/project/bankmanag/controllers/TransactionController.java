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

import com.project.bankmanag.exceptions.transaction.TransactionNotFoundException;
import com.project.bankmanag.models.Transaction;
import com.project.bankmanag.services.transaction.TransactionService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	private TransactionService transactionService;

	@Autowired
	public void setTransactionService(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	@GetMapping
	@ApiOperation("Find all Transactions")
	@ApiResponses(value = @ApiResponse(code = 200, message = "List of transactions received successfully"))
	List<Transaction> findAll() {
		return transactionService.getAll();
	}

	@PostMapping
	@ApiOperation("Add new Transaction")
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Transaction created successfully"),
			@ApiResponse(code = 409, message = "Field validation failed") })
	ResponseEntity<Object> newTransaction(@RequestBody @Valid Transaction newTransaction) {
		Long transactionId = transactionService.addTransaction(newTransaction).getId();
		if (transactionId.equals(null)) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} else {
			JSONObject tranObj = new JSONObject();
			tranObj.put("id", transactionId);
			return new ResponseEntity<>(tranObj.toJSONString(), HttpStatus.CREATED);
		}
	}

	@GetMapping("{transactionId}")
	@ApiOperation("Find Transaction by Id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Transaction found"),
			@ApiResponse(code = 404, message = "Could not find transaction") })
	Transaction getTransactionById(@PathVariable Long transactionId) {
		return transactionService.getTransactionById(transactionId);
	}

	@PutMapping("{transactionId}")
	@ApiOperation("Update Transaction")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Transaction updated successfully"),
			@ApiResponse(code = 404, message = "Could not find transaction to update"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	Transaction updateTransaction(@RequestBody @Valid Transaction newTransaction, @PathVariable Long transactionId) {
		return transactionService.updateTransaction(newTransaction, transactionId);
	}

	@DeleteMapping("{transactionId}")
	@ApiOperation("Delete Transaction by Id")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "Transaction deleted successfully"),
			@ApiResponse(code = 404, message = "Could not find transaction to delete"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	ResponseEntity<Object> removeTransaction(@PathVariable Long transactionId) {
		if (!getTransactionById(transactionId).equals(null)) {
			transactionService.deleteTransaction(transactionId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else
			throw new TransactionNotFoundException(transactionId);
	}
}
