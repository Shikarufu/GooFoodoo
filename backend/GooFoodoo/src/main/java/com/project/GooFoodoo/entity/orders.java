package com.project.GooFoodoo.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id,userId;

    private String customerName,address,paymentMethod;
    private double total;
    private LocalDateTime orderDate;

    //setter
    public void setId(long id){
        this.id=id;
    }
    public void setUserId(long userId){
        this.userId=userId;
    }
    public void setCustomerName(String customerName){
        this.customerName=customerName;
    }
    public void setAddress(String address){
        this.address=address;
    }
    public void setPaymentMethod(String paymentMethod){
        this.paymentMethod=paymentMethod;
    }
    public void setTotal(double total){
        this.total=total;
    }
    public void setOrderDate(LocalDateTime orderDate){
        this.orderDate=orderDate;
    }

}
