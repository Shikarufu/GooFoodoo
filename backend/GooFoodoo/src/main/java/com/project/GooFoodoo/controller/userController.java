package com.project.GooFoodoo.controller;

import com.project.GooFoodoo.entity.user;
import com.project.GooFoodoo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class userController {
    @Autowired
    userRepository userRepository;

//    create
    @PostMapping("/register")
    public user registerUser(@RequestBody user user){
        return userRepository.save(user);
    }
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody user loginRequest) {
//        user user = userRepository.findByEmail(loginRequest.getEmail());
//        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
//        }
//    }

}
