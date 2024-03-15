package com.example.taskmanager.Controllers;

import java.util.HashMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanager.Models.ForgotPassword;
import com.example.taskmanager.Models.UserDetails;
import com.example.taskmanager.Repository.UserDetailsRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class UserDetailsController {

    private final UserDetailsRepo userdetailsrepo;

    public UserDetailsController(UserDetailsRepo userdetailsrepo) {
        this.userdetailsrepo = userdetailsrepo;
    }

    @GetMapping("/")
    public HashMap<String, Object> HomeApi() {
        HashMap<String, Object> response = new HashMap<>();
        try {
            response.put("status", 200);
            response.put("response", "home Api running Succefully");
            return response;
        } catch (Exception e) {
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

    @PostMapping("/adduser")
    public HashMap<String, Object> AddUser(@RequestBody UserDetails data) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            String email = data.getEmail();
            HashMap<String, Object> result = GetUser(email);
            if ((int) result.get("status") == 200) {
                response.put("status", 400);
                response.put("response", "Email already Existed");
                return response;
            } else {
                userdetailsrepo.save(data);
                response.put("status", 200);
                response.put("response", "Data Sucessfully Posted");
                return response;
            }
        } catch (Exception e) {
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

    @GetMapping("/user/{email}")
    public HashMap<String, Object> GetUser(@PathVariable String email) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            UserDetails data = userdetailsrepo.findByEmail(email);
            if (data != null) {
                response.put("status", 200);
                response.put("response", data);
                return response;
            } else {
                response.put("status", 400);
                response.put("response", "Email Not Registered");
                return response;
            }
        } catch (Exception e) {
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

    @PostMapping("/user/changepassword")
    public HashMap<String, Object> ChangePassword(@RequestBody ForgotPassword data) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            String email = data.getEmail();
            UserDetails userDetails = userdetailsrepo.findByEmail(email);
            if (userDetails != null) {
                UserDetails newUserDetails = new UserDetails();
                newUserDetails.setEmail(email);
                newUserDetails.setPassword(data.getNewpassword());
                newUserDetails.setFirstname(userDetails.getFirstname());
                newUserDetails.setLastname(userDetails.getLastname());
                userdetailsrepo.deleteByEmail(email);
                userdetailsrepo.save(newUserDetails);
                response.put("status", 200);
                response.put("response", "Password updated successfully");
            } else {
                response.put("status", 400);
                response.put("response", "Email not found");
            }
        } catch (Exception e) {
            response.put("status", 500);
            response.put("response", e.getMessage());
        }
        return response;
    }

}
