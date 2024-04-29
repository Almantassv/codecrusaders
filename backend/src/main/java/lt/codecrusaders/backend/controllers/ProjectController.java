package lt.codecrusaders.backend.controllers;

import lt.codecrusaders.backend.model.dto.ProjectCreationDTO;
import lt.codecrusaders.backend.model.dto.TaskCreationDTO;
import lt.codecrusaders.backend.model.entity.Project;
import lt.codecrusaders.backend.model.entity.Task;
import lt.codecrusaders.backend.services.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/projects")
@Validated
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(@RequestParam(required = false, name = "search") String searchQuery) {
        List<Project> projects;
        if (searchQuery != null && !searchQuery.isEmpty()) {
            projects = projectService.findProjectsByName(searchQuery);;
        } else {
            projects = projectService.getAllProjects();
        }
        return new ResponseEntity<>(projects, (projects.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.FOUND));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody ProjectCreationDTO projectCreationDTO) {
        Project createdProject = projectService.createProject(projectCreationDTO);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectById(@PathVariable Long id) {
        projectService.deleteProjectById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        Project updatedProject = projectService.updateProject(id, project);
        if (updatedProject != null) {
            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/tasks")
    public ResponseEntity<Task> createProjectTask(@PathVariable Long id, @RequestBody TaskCreationDTO taskCreationDTO) {
        System.out.println(id);
        Task createdTask = projectService.createProjectTask(id, taskCreationDTO);
        return new ResponseEntity<>(createdTask, (createdTask != null ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST));
    }
}