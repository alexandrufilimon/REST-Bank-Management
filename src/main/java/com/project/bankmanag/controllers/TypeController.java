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

import com.project.bankmanag.exceptions.type.TypeNotFoundException;
import com.project.bankmanag.models.Type;
import com.project.bankmanag.services.type.TypeService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/types")
public class TypeController {
	private TypeService typeService;

	@Autowired
	public void setTypeService(TypeService typeService) {
		this.typeService = typeService;
	}

	@GetMapping
	@ApiOperation("Find all Types")
	@ApiResponses(value = @ApiResponse(code = 200, message = "List of types received successfully"))
	List<Type> findAll() {
		return typeService.getAll();
	}

	@PostMapping
	@ApiOperation("Add new Type")
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Type created successfully"),
			@ApiResponse(code = 409, message = "A type already exists with same name"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	ResponseEntity<Object> newType(@RequestBody @Valid Type newType) {
		Long typeId = typeService.addType(newType).getId();
		if (typeId.equals(null)) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		} else {
			JSONObject typeObj = new JSONObject();
			typeObj.put("id", typeId);
			return new ResponseEntity<>(typeObj.toJSONString(), HttpStatus.CREATED);
		}
	}

	@GetMapping("{typeId}")
	@ApiOperation("Find Type by Id")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Type found"),
			@ApiResponse(code = 404, message = "Could not find type") })
	Type getTypeById(@PathVariable Long typeId) {
		return typeService.getTypeById(typeId);
	}

	@PutMapping("{typeId}")
	@ApiOperation("Update Type")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Type updated successfully"),
			@ApiResponse(code = 404, message = "Could not find type to update"),
			@ApiResponse(code = 400, message = "Field validation failed") })
	Type updateType(@RequestBody @Valid Type newType, @PathVariable Long typeId) {
		return typeService.updateType(newType, typeId);
	}

	@DeleteMapping("{typeId}")
	@ApiOperation("Delete Type by Id")
	@ApiResponses(value = { @ApiResponse(code = 204, message = "Type deleted successfully"),
			@ApiResponse(code = 404, message = "Could not find type to delete") })
	ResponseEntity<Object> removeType(@PathVariable Long typeId) {
		if (!getTypeById(typeId).equals(null)) {
			typeService.deleteType(typeId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else
			throw new TypeNotFoundException(typeId);
	}
}
