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
    public ResponseEntity<List<Project>> getProjects(
        @RequestParam(required = false, name = "search") String searchQuery,
        @RequestParam(required = false, name = "show") String showQuery,
        @RequestParam(required = false, name = "page") Integer page) {
        List<Project> projects;
        if (searchQuery != null && !searchQuery.isEmpty() || showQuery != null && !showQuery.isEmpty()) {
            projects = projectService.findProjectsByName(searchQuery, showQuery);
        } else {
            projects = projectService.getAllProjects();
        }
        if (page != null && page > 0) {
            int projectsPerPage = 8;
            int maxPages = (int)Math.ceil((double)projects.size() / projectsPerPage);
            int startIndex = (page - 1) * projectsPerPage;
            int endIndex = Math.min(startIndex + projectsPerPage, projects.size());

            projects = projects.subList(startIndex, endIndex);

            return new ResponseEntity<>(projects, (page == maxPages ? HttpStatus.ACCEPTED : HttpStatus.OK));
        }
        return new ResponseEntity<>(projects, HttpStatus.OK);
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

    // Tasks

    @PostMapping("/{id}/tasks")
    public ResponseEntity<Task> createProjectTask(@PathVariable Long id, @RequestBody TaskCreationDTO taskCreationDTO) {
        Task createdTask = projectService.createProjectTask(id, taskCreationDTO);
        return new ResponseEntity<>(createdTask, (createdTask != null ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<Task>> getProjectTasks(@PathVariable Long id, @RequestParam(required = false, name = "search") String searchQuery) {
        List<Task> tasks;
        if (searchQuery != null && !searchQuery.isEmpty()) {
            tasks = projectService.findProjectTasksByName(id, searchQuery);;
        } else {
            tasks = projectService.getAllProjectTasks(id);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/tasks/{taskID}")
    public ResponseEntity<Void> deleteProjectTaskByID(@PathVariable Long id, @PathVariable Long taskID) {
        if (projectService.deleteProjectTask(id, taskID)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}/tasks/{taskID}")
    public ResponseEntity<Task> updateProjectTaskByID(@PathVariable Long id, @PathVariable Long taskID, @RequestBody Task task) {
        Task updatedTask = projectService.updateProjectTask(id, taskID, task);
        if (updatedTask != null) {
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}