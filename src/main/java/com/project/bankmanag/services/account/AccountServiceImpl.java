package com.project.bankmanag.services.account;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.bankmanag.exceptions.account.AccountExistException;
import com.project.bankmanag.exceptions.account.AccountNotFoundException;
import com.project.bankmanag.models.Account;
import com.project.bankmanag.repositories.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {
	private Logger LOG = LoggerFactory.getLogger(AccountService.class);
	private AccountRepository AccountRepository;

	@Autowired
	public void setAccountRepository(AccountRepository AccountRepository) {
		this.AccountRepository = AccountRepository;
	}

	@Override
	public List<Account> getAll() {
		List<Account> Accounts = new ArrayList<>();
		try {
			LOG.info("Getting all Accounts...");
			Accounts = AccountRepository.findAll();
		} catch (Exception e) {
			LOG.error("An error ocurred during getting all Accounts:" + e.getMessage());
		}
		return Accounts;
	}

	@Override
	public Account getAccountById(Long id) {
		Optional<Account> Account = AccountRepository.findById(id);
		if (Account.isPresent())
			return Account.get();
		else
			throw new AccountNotFoundException(id);
	}

	@Override
	public Account addAccount(Account Account) {
		Account newAccount = new Account();
		try {
			LOG.info("Adding new Account...");
			newAccount = AccountRepository.save(Account);
		} catch (Exception e) {
			LOG.error("An error ocurred during adding Account:" + e.getMessage());
			throw new AccountExistException(Account.getIBAN());
		}
		return newAccount;
	}

	@Override
	public Account updateAccount(Account AccountToUpdate, Long id) {
		Optional<Account> foundAccount = AccountRepository.findById(id);
		if (foundAccount.isPresent()) {
			Account AccountUpdated = foundAccount.get();
			AccountUpdated.populate(AccountToUpdate.getAmount(), AccountToUpdate.getIBAN(),
					AccountToUpdate.getPinCode(), AccountToUpdate.getCurrencyName(), AccountToUpdate.getAccountName());
			return AccountRepository.save(AccountUpdated);
		} else
			throw new AccountNotFoundException(id);
	}

	@Override
	public void deleteAccount(Long id) {
		try {
			LOG.info("Deleting Account...");
			AccountRepository.delete(AccountRepository.findById(id).get());
		} catch (Exception e) {
			LOG.error("An error ocurred during deleting Account:" + e.getMessage());
		}
	}
}
