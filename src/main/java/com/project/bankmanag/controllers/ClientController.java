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

import com.project.bankmanag.exceptions.client.ClientNotFoundException;
import com.project.bankmanag.models.Client;
import com.project.bankmanag.services.client.ClientService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/clients")
public class ClientController {
	private ClientService clientService;

	@Autowired
	public void setClientService(ClientService clientService) {
		this.clientService = clientService;
	}

	@GetMapping
	@ApiOperation("Find all clients")
	@ApiResponses(value = @ApiResponse(code = 200, message = "List of clients received successfully"))
	List<Client> findAll() {
		return clientService.getAll();
	}

	@PostMapping
	@ApiOperation("Add new client")
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Client created successfully"),
			@ApiResponse(code = 409, message = "A client already exists with same CNP"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	ResponseEntity<Object> newClient(@RequestBody @Valid Client newClient) {
		Long clientId = clientService.addClient(newClient).getClientId();
		if (clientId.equals(null)) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} else {
			JSONObject clientObj = new JSONObject();
			clientObj.put("id", clientId);
			return new ResponseEntity<>(clientObj.toJSONString(), HttpStatus.CREATED);
		}
	}

	@GetMapping("{clientId}")
	@ApiOperation("Find client by Id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Client found"),
			@ApiResponse(code = 404, message = "Could not find client") })
	Client getClientById(@PathVariable Long clientId) {
		return clientService.getClientById(clientId);
	}

	@PutMapping("{clientId}")
	@ApiOperation("Update client")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Client updated successfully"),
			@ApiResponse(code = 404, message = "Could not find client to update"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	Client updateClient(@RequestBody @Valid Client newClient, @PathVariable Long clientId) {
		return clientService.updateClient(newClient, clientId);
	}

	@DeleteMapping("{clientId}")
	@ApiOperation("Delete client by Id")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "Client deleted successfully"),
			@ApiResponse(code = 404, message = "Could not find client to delete") })
	ResponseEntity<Object> removeClient(@PathVariable Long clientId) {
		if (!getClientById(clientId).equals(null)) {
			clientService.deleteClient(clientId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else
			throw new ClientNotFoundException(clientId);
	}
}
