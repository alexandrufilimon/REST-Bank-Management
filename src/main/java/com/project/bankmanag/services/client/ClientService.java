package com.project.bankmanag.services.client;

import java.util.List;

import com.project.bankmanag.models.Client;

public interface ClientService {

	public List<Client> getAll();

	public Client getClientById(Long id);

	public Client addClient(Client client);

	public Client updateClient(Client clientToUpdate, Long id);

	public void deleteClient(Long id);
}
