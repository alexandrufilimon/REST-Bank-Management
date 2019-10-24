package com.project.bankmanag.services.transaction;

import java.util.List;

import com.project.bankmanag.models.Transaction;

public interface TransactionService {
	public List<Transaction> getAll();
	
	public Transaction getTransactionById(Long id);
	
	public Transaction addTransaction(Transaction transaction);
	
	public Transaction updateTransaction(Transaction transactionToUpdate, Long id);
	
	public void deleteTransaction(Long id);
}
