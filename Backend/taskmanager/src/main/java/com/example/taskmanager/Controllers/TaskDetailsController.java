package com.example.taskmanager.Controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.taskmanager.Models.TaskDetails;
import com.example.taskmanager.Repository.TaskDetailsRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/task")
public class TaskDetailsController {

    private final TaskDetailsRepo taskdetailsrepo;
    private final MongoTemplate mongotemplate;

    public TaskDetailsController(TaskDetailsRepo taskDetailsRepo,MongoTemplate mongoTemplate) {
        this.taskdetailsrepo = taskDetailsRepo;
        this.mongotemplate = mongoTemplate;
    }

    @PostMapping("/addtask")
    public HashMap<String, Object> AddTask(@RequestBody TaskDetails data) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            int taskid = data.getTaskid();
            HashMap<String, Object> result = GetTaskWithId(taskid);
            Object value = result.get("status");
            if (value instanceof Integer && (Integer) value == 400) {
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

    @GetMapping("/gettask/{id}")
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
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

    @GetMapping("/alltasks")
    public HashMap<String,Object> GetallTasks(){
        HashMap<String,Object> response = new HashMap<>();
        try{
            List<TaskDetails>completetasks = taskdetailsrepo.findAll();
            if (completetasks.size()>=1){
                response.put("status", 200);
                response.put("response", completetasks);
                return response;
            }
            else{
                response.put("status", 400);
                response.put("response", "no tasks found please add new tasks");
                return response;
            }
        }
        catch (Exception e){
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }
    }

    @GetMapping("/querytask")
    public HashMap<String,Object> TaskByQuery(@RequestParam(required = false) String taskname,
    @RequestParam(required = false) Boolean iscompleted,
    @RequestParam(required = false) String taskstartdate,
    @RequestParam(required = false) String taskenddate,
    @RequestParam(required = false) String taskcategeory
    ){
        HashMap<String,Object> response =  new HashMap<>();
        try{
            Query query = new Query();
            if(taskname != null){
                query.addCriteria(Criteria.where("taskname").is(taskname));
            }
            if (iscompleted !=null){
                query.addCriteria(Criteria.where("iscompleted").is(iscompleted));
            }
            if (taskstartdate !=null){
                query.addCriteria(Criteria.where("taskstartdate").is(taskstartdate));
            }
            if (taskenddate !=null){
                query.addCriteria(Criteria.where("taskenddate").is(taskenddate));
            }
            if (taskcategeory !=null){
                query.addCriteria(Criteria.where("taskcategeory").is(taskcategeory));
            }
            List<TaskDetails> queytasks = mongotemplate.find(query, TaskDetails.class);

            response.put("status", 200);
            response.put("response", queytasks);
            return response;
        }
        catch (Exception e){
            response.put("status", 500);
            response.put("response", e.getMessage());
            return response;
        }

    }




}
