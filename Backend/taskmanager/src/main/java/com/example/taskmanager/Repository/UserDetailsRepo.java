package com.example.taskmanager.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.taskmanager.Models.UserDetails;

public interface UserDetailsRepo extends MongoRepository<UserDetails, String> {
    UserDetails findByEmail(String email);

    UserDetails deleteByEmail(String email);
}
