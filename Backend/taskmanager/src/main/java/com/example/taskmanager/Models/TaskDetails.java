package com.example.taskmanager.Models;

public class TaskDetails {
    private int taskid;
    private String taskname;
    private String taskstartdate;
    private String taskenddate;
    private String taskdescription;
    private String taskcategeory;
    private Boolean iscompleted;

    public int getTaskid() {
        return taskid;
    }

    public void setTaskid(int taskid) {
        this.taskid = taskid;
    }

    public String getTaskname() {
        return taskname;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    public String getTaskstartdate() {
        return taskstartdate;
    }

    public void setTaskstartdate(String taskstartdate) {
        this.taskstartdate = taskstartdate;
    }

    public String getTaskenddate() {
        return taskenddate;
    }

    public void setTaskenddate(String taskenddate) {
        this.taskenddate = taskenddate;
    }

    public String getTaskdescription() {
        return taskdescription;
    }

    public void setTaskdescription(String taskdescription) {
        this.taskdescription = taskdescription;
    }

    public String getTaskcategeory() {
        return taskcategeory;
    }

    public void setTaskcategeory(String taskcategeory) {
        this.taskcategeory = taskcategeory;
    }

    public Boolean getIscompleted() {
        return iscompleted;
    }

    public void setIscompleted(Boolean iscompleted) {
        this.iscompleted = iscompleted;
    }
}
