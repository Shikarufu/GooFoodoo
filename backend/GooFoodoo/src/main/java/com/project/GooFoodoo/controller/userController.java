package com.project.GooFoodoo.controller;

//import entity
import com.project.GooFoodoo.entity.User;
import com.project.GooFoodoo.entity.loginRequest;
import com.project.GooFoodoo.entity.orders;

import com.project.GooFoodoo.repository.orderRepository;
import com.project.GooFoodoo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class userController {
    @Autowired
    userRepository userRepository;
    @Autowired
    orderRepository orderRepository;

//    create
    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginRequest request){
        Optional<User> user=userRepository.findByEmail(request.getEmail());

        if(user.isEmpty()){
            return ResponseEntity.status(404).body("Email not found");
        }
        if(!user.get().getPassword().equals(request.getPassword())){
            return ResponseEntity.status(401).body("Incorrect Password");
        }


        return ResponseEntity.ok(user.get());
    }
//    fetch data for login
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        Optional<User> user=userRepository.findById(id);

        if(user.isEmpty()){
            return ResponseEntity.notFound().build();
        }


        return ResponseEntity.ok(user.get());
    }

    //orders
    @PostMapping("/order")
    public orders saveOrder(@RequestBody orders order){

        return orderRepository.save(order);
    }

    //fetch data
    @GetMapping("/order/{id}")
    public List<orders> getUserOrders(@PathVariable Long id){

        return orderRepository.findByUserId(id);
    }
}
