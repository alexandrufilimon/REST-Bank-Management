package com.project.bankmanag.services.type;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bankmanag.exceptions.type.TypeExistException;
import com.project.bankmanag.exceptions.type.TypeNotFoundException;
import com.project.bankmanag.models.Type;
import com.project.bankmanag.repositories.TypeRepository;

@Service
public class TypeServiceImpl implements TypeService {
	private Logger LOG = LoggerFactory.getLogger(TypeService.class);
	private TypeRepository typeRepository;
	
	@Autowired
	public void setTypeRepository(TypeRepository typeRepository) {
		this.typeRepository = typeRepository;
	}
	
	@Override
	public List<Type> getAll(){
		List<Type> Types = new ArrayList<>();
		try {
			LOG.info("Getting all Types...");
			Types = typeRepository.findAll();
		} catch (Exception e){
			LOG.error("An error ocurred during getting all Types:" + e.getMessage());
		}
		return Types;
	}
	
	@Override
	public Type getTypeById(Long id){
		Optional<Type> type = typeRepository.findById(id);
		if(type.isPresent())
			return type.get();
		else throw new TypeNotFoundException(id);
	}
	
	@Override
	public Type addType(Type type){
		Type newType = new Type();
		try {
			LOG.info("Adding new Type...");
			newType = typeRepository.save(type);
		} catch(Exception e){
			LOG.error("An error ocurred during adding Type:" + e.getMessage());
			throw new TypeExistException(type.getName());
		}
		return newType;
	}
	
	@Override
	public Type updateType(Type typeToUpdate, Long id){
		Optional<Type> foundType = typeRepository.findById(id);
		if(foundType.isPresent()){
			Type typeUpdated = foundType.get();
					typeUpdated.setName(typeToUpdate.getName());
			return typeRepository.save(typeUpdated);
		} else throw new TypeNotFoundException(id);
	}
	
	@Override
	public void deleteType(Long id){
		try {
			LOG.info("Deleting Type...");
			typeRepository.delete(typeRepository.findById(id).get());
		} catch(Exception e){
			LOG.error("An error ocurred during deleting Type:" + e.getMessage());
		}
	}
}
