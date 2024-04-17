package lt.codecrusaders.backend.services;

import lt.codecrusaders.backend.model.dto.ProjectCreationDTO;
import lt.codecrusaders.backend.model.entity.Project;

import java.util.List;

public interface ProjectService {
    Project createProject(ProjectCreationDTO projectCreationDTO);
    Project getProjectById(Long id);
    void deleteProjectById(Long id);
    Project updateProject(Long id, Project project);
    List<Project> getAllProjects();
}