package com.example.taskmanager.Controllers;

import java.util.HashMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.taskmanager.Models.TaskDetails;
import com.example.taskmanager.Repository.TaskDetailsRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/task")
public class TaskDetailsController {

    private final TaskDetailsRepo taskdetailsrepo;

    public TaskDetailsController(TaskDetailsRepo taskDetailsRepo) {
        this.taskdetailsrepo = taskDetailsRepo;
    }

    @PostMapping("/addtask")
    public HashMap<String, Object> AddTask(TaskDetails data) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            int taskid = data.getTaskid();
            HashMap<String, Object> result = GetTaskWithId(taskid);
            if ((int) result.get("status") == 400) {
                taskdetailsrepo.save(data);
                response.put("status", 200);
                response.put("response", "Task Added Successfully");
                return response;
            } else {
                response.put("status", 400);
                response.put("response", "Task Already Exists");
                return response;
            }
        } catch (Exception e) {
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

    @GetMapping("/taskid/{id}")
    public HashMap<String, Object> GetTaskWithId(@PathVariable int id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            TaskDetails result = taskdetailsrepo.findByTaskid(id);
            if (result != null) {
                response.put("status", 200);
                response.put("response", result);
                return response;
            } else {
                response.put("status", 400);
                response.put("response", "No Task Found");
                return response;
            }
        } catch (Exception e) {
            response.put("status", 200);
            response.put("response", e.getMessage());
            return response;
        }
    }

}
