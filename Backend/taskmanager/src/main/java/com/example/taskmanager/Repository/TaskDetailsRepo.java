package com.example.taskmanager.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.taskmanager.Models.TaskDetails;

public interface TaskDetailsRepo extends MongoRepository<TaskDetails, Integer> {

    TaskDetails findByTaskid(int taskid);
}
