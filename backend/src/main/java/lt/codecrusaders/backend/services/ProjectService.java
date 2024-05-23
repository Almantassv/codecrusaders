package lt.codecrusaders.backend.services;

import lt.codecrusaders.backend.model.dto.ProjectCreationDTO;
import lt.codecrusaders.backend.model.dto.TaskCreationDTO;
import lt.codecrusaders.backend.model.entity.Project;
import lt.codecrusaders.backend.model.entity.Task;

import java.util.List;

public interface ProjectService {
    Project createProject(ProjectCreationDTO projectCreationDTO);
    Project getProjectById(Long id);
    void deleteProjectById(Long id);
    Project updateProject(Long id, Project project);
    List<Project> getAllProjects();
    List<Project> findProjectsByName(String name, String show);
    Task createProjectTask(Long projectId, TaskCreationDTO taskCreationDTO);
    boolean deleteProjectTask(Long projectId, Long taskId);
    Task updateProjectTask(Long id, Long taskID, Task task);
    List<Task> getAllProjectTasks(Long projectId);
    List<Task> findProjectTasksByName(Long projectId, String name);
}