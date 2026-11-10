package com.project.GooFoodoo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.GooFoodoo.entity.orders;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface orderRepository extends JpaRepository<orders,Long> {

    List<orders> findByUserId(Long userId);
}
