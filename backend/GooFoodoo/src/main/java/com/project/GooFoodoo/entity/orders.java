package com.project.GooFoodoo.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "orders")
public class orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    order id
    private Long id;
    private Long userId;

    private String customerName,address,paymentMethod;
    private double total;
    @JsonFormat(
        pattern = "yyyy-MM-dd'T'HH:mm:ssXXX"
    )
    private OffsetDateTime orderDate;

    @PrePersist
    protected void onCreate(){
        this.orderDate=OffsetDateTime.now(ZoneOffset.UTC);
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
    public void setOrderDate(OffsetDateTime orderDate){
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

    public OffsetDateTime getOrderDate() {
        return orderDate;
    }
}
