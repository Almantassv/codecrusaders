package lt.codecrusaders.backend.services;

import lt.codecrusaders.backend.model.dto.ProjectCreationDTO;
import lt.codecrusaders.backend.model.dto.TaskCreationDTO;
import lt.codecrusaders.backend.model.entity.*;
import lt.codecrusaders.backend.repositories.ProjectRepository;
import lt.codecrusaders.backend.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public Project createProject(ProjectCreationDTO projectCreationDTO) {
        Project project = new Project(projectCreationDTO);
        return projectRepository.save(project);
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public Project updateProject(Long id, Project project) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project existingProject = optionalProject.get();
            existingProject.setName(project.getName());
            existingProject.setDescription(project.getDescription());
            existingProject.setStatus(project.getStatus());
            return projectRepository.save(existingProject);
        } else {
            return null;
        }
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> findProjectsByName(String name, String status) {
        if (status != null && !status.isEmpty()) {
            return projectRepository.findByStatus(ProjectStatus.valueOf(status.toUpperCase()));
        }
        return projectRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Task createProjectTask(Long projectId, TaskCreationDTO taskCreationDTO) {
        Project project = getProjectById(projectId);
        if (project == null) { return null; }
        Task projectTask = new Task();
        Date currentDate = new Date();
        projectTask.setName(taskCreationDTO.getName());
        projectTask.setDescription(taskCreationDTO.getDescription());
        projectTask.setStatus(EStatus.valueOf(taskCreationDTO.getStatus()));
        projectTask.setPriority(EPriority.valueOf(taskCreationDTO.getPriority()));
        projectTask.setCreated(currentDate);
        projectTask.setEdited(currentDate);
        projectTask.setProject(project);
        project.addTask(projectTask);
        projectRepository.save(project);
        return projectTask;
    }

    @Override
    public boolean deleteProjectTask(Long projectId, Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            if (task.getProject().getId() == projectId) {
                taskRepository.delete(task);
                return true;
            }
        }
        return false;
    }


    @Override
    public Task updateProjectTask(Long id, Long taskID, Task task) {
        Optional<Task> optionalTask = taskRepository.findById(taskID);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setName(task.getName());
            existingTask.setDescription(task.getDescription());
            existingTask.setStatus(task.getStatus());
            existingTask.setPriority(task.getPriority());
            existingTask.setEdited(new Date());
            return taskRepository.save(existingTask);
        }
        return null;
    }

    @Override
    public List<Task> getAllProjectTasks(Long projectId) {
        Project project = getProjectById(projectId);
        return project.getTasks();
    }

    @Override
    public List<Task> findProjectTasksByName(Long projectId, String name) {
        return taskRepository.findByProjectIdAndNameContaining(projectId, name);
    }
}