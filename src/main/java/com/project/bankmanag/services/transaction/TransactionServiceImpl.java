package com.project.bankmanag.services.transaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bankmanag.exceptions.transaction.TransactionNotFoundException;
import com.project.bankmanag.models.Transaction;
import com.project.bankmanag.repositories.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {
	private Logger LOG = LoggerFactory.getLogger(TransactionService.class);
	private TransactionRepository transactionRepository;

	@Autowired
	public void setTransactionRepository(TransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}

	@Override
	public List<Transaction> getAll() {
		List<Transaction> Transactions = new ArrayList<>();
		try {
			LOG.info("Getting all Transactions...");
			Transactions = transactionRepository.findAll();
		} catch (Exception e) {
			LOG.error("An error ocurred during getting all Transactions:" + e.getMessage());
		}
		return Transactions;
	}

	@Override
	public Transaction getTransactionById(Long id) {
		Optional<Transaction> transaction = transactionRepository.findById(id);
		if (transaction.isPresent())
			return transaction.get();
		else
			throw new TransactionNotFoundException(id);
	}

	@Override
	public Transaction addTransaction(Transaction transaction) {
		Transaction newTransaction = new Transaction();
		try {
			LOG.info("Adding new Transaction...");
			newTransaction = transactionRepository.save(transaction);
		} catch (Exception e) {
			LOG.error("An error ocurred during adding Transaction:" + e.getMessage());
		}
		return newTransaction;
	}

	@Override
	public Transaction updateTransaction(Transaction transactionToUpdate, Long id) {
		Optional<Transaction> foundTransaction = transactionRepository.findById(id);
		if (foundTransaction.isPresent()) {
			Transaction transactionUpdated = foundTransaction.get();
			transactionUpdated.populate(transactionToUpdate.getAmount(), transactionToUpdate.getDate(),
					transactionToUpdate.getType());
			return transactionRepository.save(transactionUpdated);
		} else
			throw new TransactionNotFoundException(id);
	}

	@Override
	public void deleteTransaction(Long id) {
		try {
			LOG.info("Deleting Transaction...");
			transactionRepository.delete(transactionRepository.findById(id).get());
		} catch (Exception e) {
			LOG.error("An error ocurred during deleting Transaction:" + e.getMessage());
		}
	}
}
