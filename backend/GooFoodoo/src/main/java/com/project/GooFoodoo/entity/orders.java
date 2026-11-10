package com.project.GooFoodoo.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;

    private String customerName,address,paymentMethod;
    private double total;
    private LocalDateTime orderDate;

    @PrePersist
    protected void onCreate(){
        this.orderDate=LocalDateTime.now();
    }

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

    //getter
    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getAddress() {
        return address;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public double getTotal() {
        return total;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }
}
