package com.project.GooFoodoo.repository;

import com.project.GooFoodoo.entity.orderItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface orderItemRepository extends JpaRepository<orderItems,Long> {
    List<orderItems> findByOrderId(Long orderId);
}
