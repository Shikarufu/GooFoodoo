package com.project.GooFoodoo.repository;

import com.project.GooFoodoo.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<user,Long> {
}
