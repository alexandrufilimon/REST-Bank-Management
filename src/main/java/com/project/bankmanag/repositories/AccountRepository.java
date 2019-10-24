package com.project.bankmanag.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bankmanag.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

}
