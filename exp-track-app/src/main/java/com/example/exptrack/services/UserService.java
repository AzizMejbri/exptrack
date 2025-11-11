package com.example.exptrack.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.exptrack.models.User;
import com.example.exptrack.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService{
    
    @Autowired
    UserRepository userRep ;

    @Transactional
    public List<User> getUsers(){
        return userRep.findAll();
    }

    @Transactional 
    public User saveUser(User user){
        return userRep.save(user);
    }

    @Transactional
    public User findById(Long userId) { 
        return userRep
            .findById(userId)
            .orElseThrow(() -> new RuntimeException("unkown user"));
    }

}


