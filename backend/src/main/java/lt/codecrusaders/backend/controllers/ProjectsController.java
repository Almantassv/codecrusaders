package lt.codecrusaders.backend.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
public class ProjectsController { // TODO Rolems isbandyti, veliau reikes funkcionaluma
    @PostMapping(value = "/api/projects")
    public String addProject() {
        return "You are authorized to view this";
    }
}
