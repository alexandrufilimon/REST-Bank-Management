package com.project.bankmanag.services.account;

import java.util.List;

import com.project.bankmanag.models.Account;

public interface AccountService {
	public List<Account> getAll();

	public Account getAccountById(Long id);

	public Account addAccount(Account account);

	public Account updateAccount(Account accountToUpdate, Long id);

	public void deleteAccount(Long id);
}
