package com.example.taskmanager.Controllers;

import java.util.HashMap;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.taskmanager.Models.EmailDetails;

@RestController
@CrossOrigin("*")
@RequestMapping("/mail")
public class EmailSenderController {

    @Value("${spring.mail.username}")
    private String frommail;

    @Autowired
    private JavaMailSender mailSender;

    public Integer RandomOtp() {
        Random random = new Random();
        int minValue = 100000; 
        int maxValue = 999999; 
        int value = random.nextInt(maxValue - minValue + 1) + minValue;
        return value;
    }
    
    @PostMapping("/send/{email}")
    public HashMap<String, Object> sendMail(@PathVariable String email, @RequestBody EmailDetails emaildetails) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            int value = RandomOtp();
            emaildetails.setMessage("Your Otp For the Login is " + value + " please enter properly");
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(frommail);
            simpleMailMessage.setSubject(emaildetails.getSubject());
            simpleMailMessage.setText(emaildetails.getMessage());
            simpleMailMessage.setTo(email);
            mailSender.send(simpleMailMessage);
            response.put("status", 200);
            response.put("response", "Email Sent Successfully");
            response.put("otp", value);
            return response;
        } catch (Exception e) {
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

}
