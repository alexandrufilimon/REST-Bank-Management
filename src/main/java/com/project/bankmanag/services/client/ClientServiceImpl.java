package com.project.bankmanag.services.client;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bankmanag.exceptions.client.ClientExistException;
import com.project.bankmanag.exceptions.client.ClientNotFoundException;
import com.project.bankmanag.models.Client;
import com.project.bankmanag.repositories.ClientRepository;

@Service
public class ClientServiceImpl implements ClientService {
	private Logger LOG = LoggerFactory.getLogger(ClientService.class);
	private ClientRepository clientRepository;

	@Autowired
	public void setClientRepository(ClientRepository clientRepository) {
		this.clientRepository = clientRepository;
	}

	@Override
	public List<Client> getAll() {
		List<Client> clients = new ArrayList<>();
		try {
			LOG.info("Getting all clients...");
			clients = clientRepository.findAll();
		} catch (Exception e) {
			LOG.error("An error ocurred during getting all clients:" + e.getMessage());
		}
		return clients;
	}

	@Override
	public Client getClientById(Long id) {
		Optional<Client> client = clientRepository.findById(id);
		if (client.isPresent())
			return client.get();
		else
			throw new ClientNotFoundException(id);
	}

	@Override
	public Client addClient(Client client) {
		Client newClient = new Client();
		try {
			LOG.info("Adding new client...");
			newClient = clientRepository.save(client);
		} catch (Exception e) {
			LOG.error("An error ocurred during adding client:" + e.getMessage());
			throw new ClientExistException(client.getCnp());
		}
		return newClient;
	}

	@Override
	public Client updateClient(Client clientToUpdate, Long id) {
		Optional<Client> foundClient = clientRepository.findById(id);
		if (foundClient.isPresent()) {
			Client clientUpdated = foundClient.get();
			clientUpdated.populate(clientToUpdate.getFirstName(), clientToUpdate.getLastName(), clientToUpdate.getCnp(),
					clientToUpdate.getPoB(), clientToUpdate.getDoB());
			return clientRepository.save(clientUpdated);
		} else
			throw new ClientNotFoundException(id);
	}

	@Override
	public void deleteClient(Long id) {
		try {
			LOG.info("Deleting client...");
			clientRepository.delete(clientRepository.findById(id).get());
		} catch (Exception e) {
			LOG.error("An error ocurred during deleting client:" + e.getMessage());
		}
	}

}
