package com.project.bankmanag.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.bankmanag.models.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

}
