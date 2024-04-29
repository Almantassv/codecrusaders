package lt.codecrusaders.backend.services;

import lt.codecrusaders.backend.model.dto.ProjectCreationDTO;
import lt.codecrusaders.backend.model.dto.TaskCreationDTO;
import lt.codecrusaders.backend.model.entity.EPriority;
import lt.codecrusaders.backend.model.entity.EStatus;
import lt.codecrusaders.backend.model.entity.Project;
import lt.codecrusaders.backend.model.entity.Task;
import lt.codecrusaders.backend.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
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
    public List<Project> findProjectsByName(String name) { return projectRepository.findByNameContaining(name); }

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
}