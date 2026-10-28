package com.project.GooFoodoo.controller;

import com.project.GooFoodoo.entity.user;
import com.project.GooFoodoo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class userController {
    @Autowired
    userRepository userRepository;

    //create
    @PostMapping("/register")
    public user registerUser(@RequestBody user user){
        return userRepository.save(user);
    }

}
