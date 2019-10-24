package com.project.bankmanag.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bankmanag.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>{

}
