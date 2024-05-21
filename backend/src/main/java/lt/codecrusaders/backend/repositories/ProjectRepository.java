package lt.codecrusaders.backend.repositories;

import lt.codecrusaders.backend.model.entity.Project;
import lt.codecrusaders.backend.model.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByNameContainingIgnoreCase(String name);
    List<Project> findByStatus(ProjectStatus status);
}