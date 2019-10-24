package com.project.bankmanag.services.type;

import java.util.List;

import com.project.bankmanag.models.Type;

public interface TypeService {
	public List<Type> getAll();
	
	public Type getTypeById(Long id);
	
	public Type addType(Type type);
	
	public Type updateType(Type typeToUpdate, Long id);
	
	public void deleteType(Long id);
}
