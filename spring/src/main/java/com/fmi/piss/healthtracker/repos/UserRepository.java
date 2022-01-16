package com.fmi.piss.healthtracker.repos;

import com.fmi.piss.healthtracker.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
}
