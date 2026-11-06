package com.project.GooFoodoo.repository;

import com.project.GooFoodoo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


//@Repository
public interface userRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String mail);
}
