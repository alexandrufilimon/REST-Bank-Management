package com.project.bankmanag.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bankmanag.models.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
	// findbyName etc.
}
